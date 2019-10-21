const config = () => {
  return {
    projectName: process.env.PROJECT_NAME,
    service: {
      port: process.env.SERVICE_PORT,
      host: process.env.SERVICE_HOST
    },
    env: process.env.NODE_ENV
  }
}

module.exports = config