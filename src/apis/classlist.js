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

    /* GET /classlist
    *  Returns the classlist from the configured Brightspace Org Unit
    */
    router.get('/classlist', function (req, res) {

        const apiPath = '/d2l/api/le/1.12/' + configs.orgUnitId + '/classlist/';
        const accessToken = req.cookies[configs.cookieName].accessToken;
        const classlistRoute = createUrl(apiPath);
        request
            .get(classlistRoute)
            .set('Authorization', `Bearer ${accessToken}`)
            .end(function(error, response) {
                if (error) {
                    console.log('Error calling the classlist route', error);
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
