(function(){

'use strict';

/****
    It is not recommended to commit your application key or client secret to ANY repository. In this case
    these keys were generated against the devcop Brightspace instance which can be used for developer testing.
 ****/
module.exports = {
    authCodeScope: process.env.AUTH_SCOPE || 'core:*:*',
    authEndpoint: process.env.AUTH_ENDPOINT || 'https://auth.brightspace.com/oauth2/auth',
    clientId: process.env.CLIENT_ID || '6b68a6a5-dcc3-490f-b663-a168098a17f9',
    clientSecret: process.env.CLIENT_SECRET || 'Sc3VEkj1e-w9wt8T8brfeTqKgklPxTJUMa24dCKueKY',
    configuredPort:  process.env.TOKEN_CONFIGURED_PORT || 3434,
    cookieName: process.env.COOKIE_NAME || 'brightspaceChatCookie',
    cookieOptions: { httpOnly: true, secure: true },
    instanceScheme: process.env.INSTANCE_SCHEME || 'https:',
    instanceUrl: process.env.INSTANCE_URL || 'devcop.brightspace.com',
    instancePort: process.env.INSTANCE_PORT || '443',
    stateCookieName: process.env.STATE_COOKIE_NAME || 'brightspaceChatState',
    tokenEndpoint: process.env.TOKEN_ENDPOINT || 'https://auth.brightspace.com/core/connect/token',
    orgUnitId: 6609,
    successEndpoint: '/ui/src/html/index.html'
};
}());
