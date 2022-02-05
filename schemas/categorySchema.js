const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string().required().messages({
    'string.base': '"name" should be a string',
    'any.required': '"name" is required',
  }),
});