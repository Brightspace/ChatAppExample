(function(){

'use strict';

const configs = require('../configurations'),
      request = require('superagent'),
      express = require('express'),
      router = express.Router();

module.exports = function() {

    /* POST /lti
    *  Endpoint for launching LTI
    */
    router.post('/lti', function (req, res) {
        configs.orgUnitId = req.body.context_id;
        res.redirect('/oauth');
    });

    /* POST /ltiTest
    *  Route for testing LTI integration
    */
    router.post('/ltiTest', function (req, res) {
        console.log(req.body);
        var result = {};
        result.result_code = "OK";
        result.result_description = "Test Passed " + req.body.lis_outcome_service_url;
        res.status(200).end(JSON.stringify(result));
    });

    return router;
};
}());
