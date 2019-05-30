const EmailValidator = require('email-deep-validator');
const patternsEnum = [
    "{fn}",
    "{ln}",
    "{fn}{ln}",
    "{fn}.{ln}",
    "{fi}{ln}",
    "{fi}.{ln}",
    "{fn}{li}",
    "{fn}.{li}",
    "{fi}{li}",
    "{fi}.{li}",
    "{ln}{fn}",
    "{ln}.{fn}",
    "{ln}{fi}",
    "{ln}.{fi}",
    "{li}{fn}",
    "{li}.{fn}",
    "{li}{fi}",
    "{li}.{fi}",
    "{fn}-{ln}",
    "{fn}-{li}",
    "{fi}-{ln}",
    "{fi}-{li}",
    "{ln}-{fn}",
    "{ln}-{fi}",
    "{li}-{fn}",
    "{li}-{fi}",
    "{fn}_{ln}",
    "{fn}_{li}",
    "{fi}_{ln}",
    "{ln}_{fn}",
    "{ln}_{fi}",
    "{li}_{fn}"
]

const GetPatternEmails = (firstName, lastName, domain) => {
    const newEmails = []
    firstName = firstName.replace(/ /g,'')
    lastName = lastName.replace(/ /g,'')
    domain = domain.replace(/ /g,'')

    patternsEnum.forEach(eachPattern => {
        let curEmail = eachPattern
        if(eachPattern.includes('{ln}'))
            curEmail = curEmail.replace('{ln}', lastName)
        if(eachPattern.includes('{li}'))
            curEmail = curEmail.replace('{li}', lastName[0])
        if(eachPattern.includes('{fn}'))
            curEmail = curEmail.replace('{fn}', firstName)
        if(eachPattern.includes('{fi}'))
            curEmail = curEmail.replace('{fi}', firstName[0])

        newEmails.push(curEmail + '@' + domain)
    })

    return newEmails;
    
}

const checkEmail = async (email) => {
    try {
        const emailValidator = new EmailValidator();
        const res = await emailValidator.verify(email, {
            timeout: 10000
        });
        return {...res, email: email};
    } catch(err) {
        return err;
    }
}

const FindEmail = async (firstName, lastName, domain) => {
    console.time("Time this");
    const emailArr = GetPatternEmails(firstName, lastName, domain)
    const res = await Promise.all(emailArr.map(m => checkEmail(m)))
    console.log(res)
    console.timeEnd("Time this");

    console.log(res.filter(r => r.wellFormed && r.validDomain && r.validMailbox))
    return res.filter(r => r.wellFormed && r.validDomain && r.validMailbox)
}

module.exports = FindEmail
 