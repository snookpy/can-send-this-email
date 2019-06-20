const {findEmail, isAcceptAllDomain, checkEmail} = require("./checkk-mx-email-patterns")
const firstName = "ittipon", lastName="laihaung", domain="mycostech.com"

(async() => {
    const result =  await findEmail(firstName, lastName, domain)
    console.log(result)
})()
