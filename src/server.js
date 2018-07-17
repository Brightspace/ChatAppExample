(function(){

'use strict';

const 
    express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    configs = require('./configurations'),
    path = require('path'),
    app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Import Authorization
app.use(require('./authorization/oauth.js')());

// Import Sample API Calls
app.use(require('./apis/whoami')());
app.use(require('./apis/classlist')());
app.use(require('./apis/profileimage')());
app.use(require('./apis/messages')());

/* GET /
* Serve up the files in the build directory which has our UI components and index page.
*/
app.use('/ui', express.static(path.join(__dirname, '../build/default')));

/* GET /
* The default server location that will return the index html page.
*/
app.get('/', function(req, res) {
     res.sendFile(path.join(__dirname+'/html/login.html'));
});

/* GET /
* The light html page to confirm socket implementation
*/
app.get('/socketTest', function(req, res) {
    res.sendFile(path.join(__dirname+'/html/socketTest.html'));
});

module.exports = app;
app.listen(configs.configuredPort);
}());