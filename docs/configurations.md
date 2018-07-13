# Configurations
When first using the samples, no configuration should be neccessary. The default configurations are setup against the [Devcop Brigthspace Instance](https://devcop.brightspace.com/d2l/login). Login credentials for this site can be accessed from the [Brigthspace Community Developer Group](https://community.brightspace.com/s/group/0F9610000001mZ1CAI). In order to access them you must be a member.

## Configuration File
Several different configurations can be set an environment level or directly in the [configurations.js](../src/configurations.js) file. The following configurations are available in this file:
* ```authCodeScope``` (string)
    * A string containing the scope(s) required for the application that enable the OAuth 2.0 authentication method to be used when making the sample API calls. This is used for the [OAuth 2.0 Authentication](authentication.md) workflow.
* ```authEndpoint``` (string/URL)
    * This is the authentication endpoint/URL that is used in the [OAuth 2.0 Authentication](authentication.md) workflow when requesting an Authentication Token. The value for this route was obtained from [here](http://docs.valence.desire2learn.com/basic/oauth2.html#setting-up-oauth-2-0-authentication).
* ```clientId``` (string)
    * A string containing the ClientId granted by the LMS using the 'Manage Extensibility' tool. This is used for the [OAuth 2.0 Authentication](authentication.md) workflow.
* ```clientSecret``` (string)
    * A string containing the Client Secret granted by the LMS using the 'Manage Extensibility' tool. This is used for the [OAuth 2.0 Authentication](authentication.md) workflow.
* ```configuredPort``` (number)
    * If self-signed certificate is not being used ([server-local.js](../server-local.js)), then this port will be the port where the node server will listen for requests.
* ```cookieName``` (string)
    * The name for the cookie where the Access Token or the UserKey/UserId is saved for later retrieval.
* ```cookieOptions``` (object)
    * The options for the cookie. By default the cookie is set to be HTTP Only and Secured.
* ```instanceScheme``` (string)
    * The HTTP scheme that the instance you are connecting to uses. The value should be either 'http:' or 'https:'.
* ```instancePort``` (number)
    * The port that the instance you are connecting to uses. Most likely this should be set to 443.
* ```instanceUrl``` (string)
    * The URL for the instance that you are connect to. This should NOT include the scheme as described above. An example value for this is: 'devcop.brightspace.com'.
* ```state``` (string)
    * The state is a value sent with the initial [OAuth 2.0](authentication.md) request to the Authentication Endpoint. When the OAuth 2.0 callback is called, the state will be passed in and can be verified with this configured value to ensure the callback was initiated from the proper location. **This value was hardcoded for the sample but normally should change with each OAuth workflow and stored securely. The state helps protect against [CSRF](https://tools.ietf.org/html/rfc6749#section-10.12) and should be a non-guessable value as described [here](https://tools.ietf.org/html/rfc6749#section-10.10).**
* ```tokenEndpoint``` (string/URL)
    * This is the token endpoint/URL that is used in the [OAuth 2.0 Authentication](authentication.md) workflow when exchanging an Authentication Token for an access token. The value for this route was obtained from [here](http://docs.valence.desire2learn.com/basic/oauth2.html#setting-up-oauth-2-0-authentication).
