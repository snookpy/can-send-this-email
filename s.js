(async function(){
  const {findEmail, isAcceptAllDomain, checkEmail} = require("./checkk-mx-email-patterns")
  try {

    //// socks 1  3 emails
    const emails1 = [
      "lai.ittipon@mycostech.com",
      "ittipon_la@mycostech.com",
      "ittipon@mycostech.com",
    ]
    // const proxyIp1 = "ec2-18-212-13-249.compute-1.amazonaws.com"
    const proxyIp1 = "1.32.247.7"
    const proxyPort1 = 53112
    const result1Promises =  emails1.map(e => checkEmail({email: e, proxyIp: proxyIp1, proxyPort: proxyPort1}))
    const finalResult1 = await Promise.all(result1Promises)
    console.log(finalResult1)


    //// socks 2 3 emails
    // const emails2 = [
    //   "ittipon@mycostech.com",
    //   "ittipon-l@mycostech.com",
    //   "l-ittipon@mycostech.com",
    // ]
    // const proxyIp2 = "ec2-18-206-95-106.compute-1.amazonaws.com"
    // const proxyPort2 = 4444
    // const result2Promises =  emails2.map(e => checkEmail({email: e, proxyIp: proxyIp2, proxyPort: proxyPort2}))
    // const finalResult2 = await Promise.all(result2Promises)
    // // console.log(finalResult2)

    // console.log([...finalResult1 ,...finalResult2])
  } catch(err) {
    console.log(err)
  }
})()