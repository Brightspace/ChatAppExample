(function(){

'use strict';

const crypto = require('crypto'),
      querystring = require('querystring'),
      configs = require('../configurations'),
      request = require('superagent'),
      express = require('express'),
      router = express.Router();

const getRedirectUri = function(req) {
    return req.protocol + '://' + req.headers.host + '/oauthcallback';
};

function genState(cb) {
    // "Cryptographic Right Answers" from tptacek
    // https://gist.github.com/tqbf/be58d2d39690c3b366ad
    // Random IDs (Was: Use 256-bit random numbers): Remains: use 256-bit random numbers.
    crypto.randomBytes(32, function(err, buf) {
        if (err) {
            return cb(err);
        }

        const randomIdentifer = buf
            .toString('base64')
            .replace(/=+$/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
        cb(null, randomIdentifer);
    });
}

function checkState(state, expectedState) {
    if (!state || typeof state !== 'string') {
        const error = new Error('Invalid or missing state parameter');
        error.code = 400;
        throw error;
    }

    if (!expectedState || typeof expectedState !== 'string') {
        const error = new Error('Invalid or missing state cookie');
        error.code = 400;
        throw error;
    }

    state = Buffer.from(state, 'base64');
    expectedState = Buffer.from(expectedState, 'base64');

    if (state.length !== expectedState.length
        || crypto.timingSafeEqual(state, expectedState)
    ) {
        const error = new Error('Invalid state parameter');
        error.code = 400;
        throw error;
    }
}

module.exports = function () {
 
    /* GET /oauth
    *   This endpoint is used to redirect the user to the authentication route
    *   on the learning environment side so that the user can confirm
    *   that they want allow this application to make API requests on
    *   their behalf.
    */
    router.get('/oauth', function(req, res, next) {
        genState(function (err, state) {
            if (err) {
                return next(err);
            }

            // It is okay to store the state value directly in a cookie only
            // because we are using a secure channel (TLS/HTTPS)
            res.cookie(configs.stateCookieName, state, { httpOnly: true, secure: true });

            const authCodeParams = querystring.stringify({
                response_type: 'code',
                redirect_uri: getRedirectUri(req),
                client_id: configs.clientId,
                scope: configs.authCodeScope,
                state: state
            });
            res.redirect(configs.authEndpoint + '?' + authCodeParams);
        });
    });

    /* GET /oauthcallback
    *   This endpoint is the callback provided when setting up an oauth
    *   client in the learning environment and is called after the user has 
    *   granted permission for this application to make API requests. This
    *   method takes the authorization code and exchanges it for
    *   the token(stores it in a cookie) that can then be used to make API requests.
    */
    router.get('/oauthcallback', function(req, res) {
        const state = req.query.state;
        const expectedState = req.cookies[configs.stateCookieName];
        res.clearCookie(configs.stateCookieName);
        checkState(state, expectedState);

        const authorizationCode = req.query.code;

        const payload = querystring.stringify({ 
            grant_type: 'authorization_code', 
            redirect_uri: getRedirectUri(req), 
            code: authorizationCode
        });

        request
            .post(configs.tokenEndpoint)
            .auth(configs.clientId, configs.clientSecret)
            .send(payload)
            .end(function(err, response) {
                if (err) {
                    console.log('Access Token Error', err.response || err);
                    res.redirect('/');
                } else if(response.statusCode !== 200) {
                    res.status(response.statusCode).send(response.error);
                } else {
                    const accessToken = response.body.access_token;
                    res.cookie(configs.cookieName, { accessToken: accessToken }, configs.cookieOptions);
                    res.redirect(configs.successEndpoint);
                }
            });
    });

    return router;
};
}());
