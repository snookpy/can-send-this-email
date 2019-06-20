const options = {
    destination: {
      host: 'mycostech-com.mail.protection.outlook.com', // host names are supported with SOCKS v4a and SOCKS v5.
      port: 25
    },
    command: 'connect', // Only the connect command is supported when chaining proxies.
    proxies: [ // The chain order is the order in the proxies array, meaning the last proxy will establish a connection to the destination.
      {
        host: '159.203.75.235', // ipv4, ipv6, or hostname
        port: 1081,
        type: 5
      },
      {
        host: '104.131.124.203', // ipv4, ipv6, or hostname
        port: 1081,
        type: 5
      }
    ]
  }
   
  // Async/Await
  try {
    const info = await SocksClient.createConnectionChain(options);
   
    console.log(info.socket);
   
    console.log(info.socket.remoteAddress) // The remote address of the returned socket is the first proxy in the chain.
    // 159.203.75.235
    const messages = [
        `HELO mycostech`,
        `MAIL FROM: <example.com>`,
        `RCPT TO: <$eiei@eiei>`
      ];
    info.socket.write(messages[0] + '\r\n');
    info.socket.on('data', (data) => {
      console.log(data.toString());
    });
  } catch (err) {
    // Handle errors
    console.log(err)
  }