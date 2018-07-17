(function(){

'use strict';

const configs = require('../configurations'),
      request = require('superagent'),
      express = require('express'),
      path = require('path'),
      router = express.Router();

const createUrl = function(apiRoute) {
    return configs.instanceScheme + '//' + configs.instanceUrl + ':' + configs.instancePort + apiRoute;
};

module.exports = function() {

    /* GET /profileimage
    *  Returns the profile image for the passed in user.
    */
    router.get('/profileimage', function (req, res) {

        const profileId = req.query.profileId;
        const apiPath = '/d2l/api/lp/1.9/profile/' + profileId + '/image';
        const accessToken = req.cookies[configs.cookieName].accessToken;
        const profileRoute = createUrl(apiPath);
        request
            .get(profileRoute)
            .set('Authorization', `Bearer ${accessToken}`)
            .end(function(error, response) {
                if(error) {
                    console.log('Error calling the profile image route', error);
                    res.status(500).send({ error: error });
                } else if(response.statusCode !== 200) {
                    res.sendFile(path.join((__dirname + '/../images/default-profile.png')));
                    return;
                } else {
                    res.set('Content-Type', response.headers['content-type']);
                    response.on('data', function(data) {
                        res.write(data);
                    });
                    response.on('end', function() {
                        res.end();
                        return;
                    });
                }
            });
    });

    return router;
};
}());
