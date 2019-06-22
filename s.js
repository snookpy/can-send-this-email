const SocksClient = require('socks').SocksClient;

const options = {
  proxy: {
    host: '172.31.46.194', // ipv4 or ipv6 or hostname
    port: 4444,
    type: 5 // Proxy version (4 or 5)
  },
 
  command: 'connect', // SOCKS command (createConnection factory function only supports the connect command)
 
  destination: {
    host: 'mycostech-com.mail.protection.outlook.com', // github.com (hostname lookups are supported with SOCKS v4a and 5)
    port: 25
  }
};

try {
  const info = await SocksClient.createConnection(options);
 
  console.log(info.socket);
  // <Socket ...>  (this is a raw net.Socket that is established to the destination host through the given proxy server)
} catch (err) {
  // Handle errors
}