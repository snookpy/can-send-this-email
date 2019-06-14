const EmailValidator = require('./email-deep-validator');
const patternsEnum = [
    "{first}",
    "{last}",
    "{first}{last}",
    "{first}.{last}",
    "{f}{last}",
    "{f}.{last}",
    "{first}{l}",
    "{first}.{l}",
    "{f}{l}",
    "{f}.{l}",
    "{last}{first}",
    "{last}.{first}",
    "{last}{f}",
    "{last}.{f}",
    "{l}{first}",
    "{l}.{first}",
    "{l}{f}",
    "{l}.{f}",
    "{first}-{last}",
    "{first}-{l}",
    "{f}-{last}",
    "{f}-{l}",
    "{last}-{first}",
    "{last}-{f}",
    "{l}-{first}",
    "{l}-{f}",
    "{first}_{last}",
    "{first}_{l}",
    "{f}_{last}",
    "{last}_{first}",
    "{last}_{f}",
    "{l}_{first}"
]

const GetPatternEmails = (firstName, lastName, domain) => {
    const newEmails = []
    firstName = firstName.replace(/ /g,'')
    lastName = lastName.replace(/ /g,'')
    domain = domain.replace(/ /g,'')

    patternsEnum.forEach(eachPattern => {
        let curEmail = eachPattern
        if(eachPattern.includes('{last}'))
            curEmail = curEmail.replace('{last}', lastName)
        if(eachPattern.includes('{l}'))
            curEmail = curEmail.replace('{l}', lastName[0])
        if(eachPattern.includes('{first}'))
            curEmail = curEmail.replace('{first}', firstName)
        if(eachPattern.includes('{f}'))
            curEmail = curEmail.replace('{f}', firstName[0])

        newEmails.push({email: curEmail + '@' + domain, pattern: eachPattern})
    })

    return newEmails;
    
}

const checkEmail = async ({email, pattern}) => {
    try {
        const emailValidator = new EmailValidator();
        const res = await emailValidator.verify(email, {
            timeout: 10000
        });
        return {...res, email: email, pattern};
    } catch(err) {
        return err;
    }
}

const findEmail = async (firstName, lastName, domain) => {
    var begin=Date.now();
    console.time("Time this");
    const emailArr = GetPatternEmails(firstName, lastName, domain)
    const raw = await Promise.all(emailArr.map(m => checkEmail(m)))
    console.timeEnd("Time this");
    var end= Date.now();
    
    var timeSpent=(end-begin)+"ms";
    console.log(timeSpent)
    canSendEmails = raw.filter(r => r.wellFormed === true && r.validDomain === true && r.validMailbox === true)

    // return raw.filter(r => r.wellFormed && r.validDomain && r.validMailbox)
    return {
        timeSpent: timeSpent,
        canSendEmails: raw.filter(r => r.wellFormed && r.validDomain && r.validMailbox),
        rawEmails: raw
        
    }
}

const isAcceptAllDomain = async (domain) => {
    const result = await checkEmail(`amcwdc6969@${domain}`)
    if (result.wellFormed === true && result.validDomain === true && result.validMailbox === true)
        return true
    else 
        return false

}

module.exports = {
    findEmail,
    isAcceptAllDomain
}
 