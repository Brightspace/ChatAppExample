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

    /* GET /allenrollments
    *  Returns the enrollments from the configured Brightspace Org Unit
    */
    router.get('/allenrollments', function (req, res) {
        var items = [];
        var bookmark = undefined;
        enrollments(items, bookmark, req, res);
    });

    function enrollments(items, bookmark, req, res) {
        const apiPath = '/d2l/api/lp/1.9/enrollments/orgUnits/' + configs.orgUnitId +  '/users/';
        const accessToken = req.cookies[configs.cookieName].accessToken;

        var path = apiPath;
        if (bookmark) {
            path = apiPath + '?bookmark=' + bookmark;
        }

        const enrollmentsRoute = createUrl(path);

        request
            .get(enrollmentsRoute)
            .set('Authorization', `Bearer ${accessToken}`)
            .end(function(error, response) {
                if (error) {
                    console.log('Error calling the enrollments route', error);
                    res.status(500).send({ error: error });
                } else if(response.statusCode !== 200) {
                    res.status(response.statusCode).send(response.error);
                } else {
                    const enrollmentsBlock = JSON.parse(response.text);
                    items = items.concat(enrollmentsBlock.Items);
                    
                    if (enrollmentsBlock.PagingInfo.HasMoreItems) {
                        enrollments(items, enrollmentsBlock.PagingInfo.Bookmark, req, res);
                    } else {
                        res.status(200).send(items);
                    }
                }
            });
    };

    return router;
};
}());
