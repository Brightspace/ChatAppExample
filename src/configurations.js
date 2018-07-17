(function(){

'use strict';

/****
    It is not recommended to commit your application key or client secret to ANY repository. In this case
    these keys were generated against the devcop Brightspace instance which can be used for developer testing.
    
    It is also recommended that the state not be a hardcoded value but instead be a value that is re-computed during each OAuth 2.0 authorization
    request. Please read the configurations documentation for additional information.
 ****/
module.exports = {
    authCodeScope: process.env.AUTH_SCOPE || 'core:*:*',
    authEndpoint: process.env.AUTH_ENDPOINT || 'https://auth-dev.proddev.d2l/oauth2/auth',
    clientId: process.env.CLIENT_ID || '6b68a6a5-dcc3-490f-b663-a168098a17f9',
    clientSecret: process.env.CLIENT_SECRET || 'Sc3VEkj1e-w9wt8T8brfeTqKgklPxTJUMa24dCKueKY',
    configuredPort:  process.env.TOKEN_CONFIGURED_PORT || 3434,
    cookieName: process.env.COOKIE_NAME || 'brightspaceChatCookie',
    cookieOptions: { httpOnly: true, secure: true },
    instanceScheme: process.env.INSTANCE_SCHEME || 'http:',
    instanceUrl: process.env.INSTANCE_URL || 'localhost',
    instancePort: process.env.INSTANCE_PORT || '44444',
    state: process.env.STATE || 'ed9dda12-1397-4bac-aba2-096acc7d24f1',
    tokenEndpoint: process.env.TOKEN_ENDPOINT || 'https://auth-dev.proddev.d2l/core/connect/token',
    orgUnitId: 6609,
    successEndpoint: '/allenrollments'
};
}());