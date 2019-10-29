*Hapi starter shell project (WIP)*

**Reason**

I started this project because I wanted to have a clean template for new services that I will implement and I tried to add in this 
template all things required to start a service in a nice and clean way.

**Features**

***Configuration***

 * Configuration is loaded from environment variables.
 * Support for loading from an `.env` file is provided. However the `dotenv` is added as dev dependency making sure that `.env` 
 is not loaded in production as this will be a bad practice.
 * Before service is started a strict schema validation is applied on configuration object. 
 This is required to make sure the application is started with a valid configuration, at least from structure point of view.
 
***Swagger documentation***

 * Swagger documentation for implemented API is exposed automatically on `/documentation` endpoint.
 * This documentation is created automatically using the HapiJs endpoint validation.
 * This documentation is exposed autoatically only for `development` environments, 
 in `staging` or `production` there will no exposed API documentation. 