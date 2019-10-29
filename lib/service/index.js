const Boom = require('boom');
const Hapi = require('hapi')
const plugins = require('./plugins')
const api = require('./../api')
const Config = require('./../../config')

async function start () {
  const config = await Config.get();
  const { version } = config.service

  const server = await register (config);
  await server.start();

  server.logger().info(`Server ${config.projectName}@${version} running at: ${server.info.uri}`);
  return server;
}

async function register (config) {
  const { service: {host, port} } = config

  const server = new Hapi.Server({
    port,
    host,
    routes: {
      validate: {
        failAction: async (request, h, err) => {
          // log endpoint validation error details.
          console.error('ValidationError:', err.message);
          throw Boom.badRequest('Invalid request payload input');
        }
      }
    }
  });

  server.app.config = config
  await server.register([
    ...plugins.configure(config),
    ...api
  ])

  process.on('SIGINT', exitHandler(server))
  process.on('SIGTERM', exitHandler(server))
  process.on('uncaughtException', exitHandler(server))
  process.on('exit', exitHandler(server))

  await decorate(server)

  return server;
}

async function decorate(server) {
  // decorate server with required objects/functions
}

function exitHandler(server) {
  return async (error) => {
    // handle the event - if required
    process.exit();
  }
}

module.exports = {
  start
}
