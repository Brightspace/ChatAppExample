(function(){

'use strict';

const configs = require('../configurations'),
      messageQueue = require('../messageQueue'),
      request = require('superagent'),
      express = require('express'),
      router = express.Router();

const createUrl = function(apiRoute) {
    return configs.instanceScheme + '//' + configs.instanceUrl + ':' + configs.instancePort + apiRoute;
};

module.exports = function() {

    /* GET /messages
    *  Returns the list of messages
    */
    router.get('/messages', function (req, res) {

        const accessToken = req.cookies[configs.cookieName].accessToken;
        if (!accessToken) {
            res.redirect('/');
            return;
        }

        res.set('Content-Type', 'application/json');
        res.status(200)
            .end(JSON.stringify(messageQueue.messages));

        return;
    });

    return router;
};
}());
