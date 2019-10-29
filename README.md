# Hapi starter shell project (WIP)

  * [Reason](#reason)
  * [Features](#features)
      * [Configuration](#configuration)
      * [Swagger documentation](#swagger-documentation)
      * [Endpoint validation](#endpoint-validation)
      * [Logging](#logging)
      * [Docker](#docker)
      * [ESLint](#eslint)
      * [Testing](#testing)
      * [Pre-commit](#pre-commit)
      * [Code Readability](#code-readability)

## Reason

I started this project because I wanted to have a clean template for new services that I will implement and I tried to add in this 
template all things required to start a service in a nice and clean way.

## Features

### Configuration

 * Configuration is loaded from environment variables.
 * Support for loading from an `.env` file is provided. However the `dotenv` is added as dev dependency making sure that `.env` 
 is not loaded in production as this will be a bad practice.
 * Before service is started a strict schema validation is applied on configuration object. 
 This is required to make sure the application is started with a valid configuration, at least from structure point of view.
 * There are no configuration defaults. This will enforce creating proper environment variables for all configuration parameters.
 
### Swagger documentation

 * Swagger documentation for implemented API is exposed automatically on `/documentation` endpoint.
 * This documentation is created automatically using the HapiJs endpoint validation.
 * This documentation is exposed autoatically only for `development` environments, 
 in `staging` or `production` there will no exposed API documentation. 
 
### Endpoint validation

 * All endpoints have a strict validation implementing using JOI
 * This implementation will be automatically described in the Swagger documentation.
 * Validation errors are not exposed in the HTTP response. The validation error reason is only exposed in log.
 
### Logging

 * Logging is done using 'hapi-pino', one of the most rapid logger available for HapiJs.
 * Logger uses a pretyy loogin style only in development environments.
 
### Docker

### ESLint

### Testing

### Pre-commit

### Code Readability