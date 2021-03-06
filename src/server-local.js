(function(){
'use strict';

const https = require('https'),
      selfSigned = require('openssl-self-signed-certificate'),
      chatSocket = require('./chatsocket'),
      app = require('./server');

const httpsPort = process.env.HTTPS_PORT || 34343;
const options = {
    key: selfSigned.key,
    cert: selfSigned.cert
};

var httpsServer = https.createServer(options, app);

chatSocket.init(httpsServer);

httpsServer.listen(httpsPort, function(){
    console.log(`HTTPS started on port ${httpsPort}`);
    console.log(`Navigate to https://localhost:${httpsPort}`);
});
}());
