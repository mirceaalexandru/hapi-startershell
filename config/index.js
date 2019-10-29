const environment = require('./environment')
const schema = require('./schema')

const internals = {}

async function get () {
  if (internals.config) {
    return internals.config;
  }
  // try to load using dotenv
  // in production dotenv will not be installed so this will not be used.
  try {
    // eslint-disable-next-line
    require('dotenv').config({ path: '.env', silent: true })
  } catch (err) {
    // ignore this error for production
  }

  const result = await schema.validate(environment());
  internals.config = result.value;
  console.log({ config: internals.config }, 'Load using configuration'); // eslint-disable-line
  return internals.config;
}

module.exports = {
  get
}
