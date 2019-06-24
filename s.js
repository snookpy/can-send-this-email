(async function(){
  const {findEmail, isAcceptAllDomain, checkEmail} = require("./checkk-mx-email-patterns")
  try {

    //// socks 1 

    const result = await checkEmail({email: "ittipon@mycostech.com", proxyIp: "ec2-18-212-13-249.compute-1.amazonaws.com"})
    console.log(result)


    //// socks 2
  } catch(err) {
    console.log(err)
  }
})()