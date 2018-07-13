# Starting with Brightspace APIs - A Sample Chat Application
This project is meant to partner with the tutorial "Starting with Brightspace APIs". It demonstrates the evolution of a sample application that consumes Brightspace APIs in order to deliver a functional application. To learn more or ask questions specific to your needs of extending the platform, the [Brightspace Community](https://community.brightspace.com/s/) is a great place to visit.

Please note, this repo is not intended to be used as production code.

## Setup
Out of the box this solution was built to work with the Devcop Brightspace instance that is available through the Brightspace Community Developer group. If you are not a member, you can easily join in order to access credentials for the Devcop instance. To register you can sign up [here](https://community.brightspace.com/SelfRegistration) and access the Developer group [here](https://community.brightspace.com/s/group/0F9610000001mZ1CAI).

#### Running Locally
1. Make sure you have [Node](https://nodejs.org/en/) installed locally on your computer.
2. Download the latest release of the code.
3. Open a command terminal at the root of the project.
4. Execute the following command to install the required packages for the project:
    ```shell
    npm install
    ```
5. Now that the required Node packages are installed the local node server can be started by running:
    ```shell
    npm run local
    ```
6. The server should now be up and running locally and in a browser you can navigate to:
    https://localhost:34343

\* Note: The reason we have to create a self signed certificate and host over HTTPS is that the OAuth 2.0 Authentication method requires an HTTPS endpoint. This means that in a browser such as Chrome you may have to accept and/or proceed the warning presented when first accessing the index page.

## Configurations
There are several different configurations that can be used to change how some of the APIs work and what the APIs execute against. For a detailed description of what the configurations are and how you can change them please see [Configurations](/docs/configurations.md).

**It is not recommended to commit your application key or client secret to ANY repository. In the configurations file the keys were generated against the devcop Brightspace instance which can be used for developer testing.**
