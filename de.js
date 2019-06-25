var rp = require('request-promise');
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


const returnOptions = (email) => {
    return options = {
        uri: "https://api.debounce.io/v1/?api=5d11eea7b0080&email=" + email,
        json: true
    }
}

const test = async () => {
    const emailArr = GetPatternEmails("ittipon", "laihaung", "mycostech.com")

    // var checkResultAsync = emailArr.map(m => rp(returnOptions(m.email)))
    
    // const resultAll = await Promise.all(checkResultAsync.slice(0,3))
    // console.log(resultAll)
    // await sleep(3000)
    // const resultAll2 = await Promise.all(checkResultAsync.slice(9,17))
    // console.log(resultAll2)
    // await sleep(3000)
    // const resultAll3 = await Promise.all(checkResultAsync.slice(18, checkResultAsync.length))
    // console.log(resultAll3)
    // const tt = await rp(returnOptions("ittipon@mycostech.com"))
    // console.log(emailArr)
    console.time("count");
    for (let i=0; i < emailArr.length; i++) {
        var req = await rp(returnOptions(emailArr[i].email))
        console.log(req)
    }
    console.timeEnd("count");
    // var req = await rp(returnOptions(emailArr[0].email))
    // console.log(req)
    // var req = await rp(returnOptions(emailArr[1].email))
    // console.log(req)
    // var req = await rp(returnOptions(emailArr[2].email))
    // console.log(req)
    // var req = await rp(returnOptions(emailArr[3].email))
    // console.log(req)
    // var req = await rp(returnOptions(emailArr[4].email))
    // console.log(req)
    // var req = await rp(returnOptions(emailArr[5].email))
    // console.log(req)
    // var req = await rp(returnOptions(emailArr[6].email))
    // console.log(req)
    // var req = await rp(returnOptions(emailArr[7].email))
    // console.log(req)
    // var req = await rp(returnOptions(emailArr[8].email))
    // console.log(req)
    // var req = await rp(returnOptions(emailArr[9].email))
    // console.log(req)
    // var req = await rp(returnOptions(emailArr[10].email))
    // console.log(req)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

test()

