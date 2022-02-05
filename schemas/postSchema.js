const Joi = require('joi');

module.exports = Joi.object({
  title: Joi.string().required().messages({
    'string.base': '"title" should be a string',
    'any.required': '"title" is required',
  }),
  content: Joi.string().required().messages({
    'string.base': '"content" should be a string',
    'any.required': '"content" is required',
  }),
  categoryIds: Joi.array().required().messages({
    'any.required': '"categoryIds" is required',
  }),
});