const Boom = require('boom');
const Hapi = require('hapi')
const plugins = require('./plugins')
const api = require('./../api')
const { version } = config.service

async function start (config) {
  const server = await register (config);
  await server.start();

  server.logger().info(`Server ${config.projectName}@${version} running at: ${server.info.uri}`);
  return server;
}

async function register (config) {
  const { host, port } = config.server

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
