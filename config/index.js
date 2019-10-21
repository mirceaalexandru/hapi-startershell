const environment = require('./environment')
const joi = require('joi');
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

  internals.config = joi.validate(environment(), schema);
  console.log({ config: internals.config }, 'Load using configuration'); // eslint-disable-line
  return internals.config;
}

module.exports = {
  get
}
