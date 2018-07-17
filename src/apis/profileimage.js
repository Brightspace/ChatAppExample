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
            .pipe(res);
    });

    return router;
};
}());
