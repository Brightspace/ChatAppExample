(function(){

'use strict';

const configs = require('../configurations'),
      request = require('superagent'),
      express = require('express'),
      router = express.Router();

const createUrl = function(apiRoute) {
    return configs.instanceScheme + '//' + configs.instanceUrl + ':' + configs.instancePort + apiRoute;
};

module.exports = function() {

    /* GET /whoami
    *  Returns the who am I information based on the currently authenticated user.
    */
    router.get('/whoami', function (req, res) {
        const apiPath = '/d2l/api/lp/1.9/users/whoami';
        const accessToken = req.cookies[configs.cookieName].accessToken;
        const whoamiRoute = createUrl(apiPath);
        request
            .get(whoamiRoute)
            .set('Authorization', `Bearer ${accessToken}`)
            .end(function(error, response) {
                if (error) {
                    console.log('Error calling the who am I route', error);
                    res.status(500).send({ error: error });
                } else if(response.statusCode !== 200) {
                    res.status(response.statusCode).send(response.error);
                } else {
                    res.status(200).send(response.text);
                }
            });
    });

    return router;
};
}());
