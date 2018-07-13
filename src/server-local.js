(function(){
'use strict';

const https = require('https'),
      selfSigned = require('openssl-self-signed-certificate'),
      app = require('./server');

const httpsPort = process.env.HTTPS_PORT || 34343;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Required for self signing cert.
const options = {
    key: selfSigned.key,
    cert: selfSigned.cert
};

https.createServer(options, app).listen(httpsPort);
console.log(`HTTPS started on port ${httpsPort}`);
console.log(`Navigate to https://localhost:${httpsPort}`);
}());