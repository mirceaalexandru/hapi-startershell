const Joi = require('joi');

const schema =
  Joi.object().keys({
    service: {
      port: Joi.number().integer().required(),
      host: Joi.string().min(3).required(),
    },
    env: Joi.string().valid(['development', 'testing', 'staging', 'production']).required(),
    projectName: Joi.string().required(),
  }).unknown()


module.exports = schema;
