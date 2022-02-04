const Joi = require('joi');

const EMAIL_PATTERN = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const PASSWORD_PATTERN = /^\w{6}$/;

module.exports = Joi.object({
  displayName: Joi.string().min(8).required().messages({
    'string.min': '"displayName" length must be at least 8 characters long',
    'string.base': '"displayName" should be a string',
    'any.required': '"displayName" is required',
  }),
  email: Joi.string().regex(EMAIL_PATTERN).required().messages({
    'string.base': '"email" should be a string',
    'any.required': '"email" is required',
    'string.pattern.base': '"email" must be a valid email',
  }),
  password: Joi.string().regex(PASSWORD_PATTERN).required().messages({
    'any.required': '"password" is required',
    'string.pattern.base': '"password" length must be 6 characters long',
  }),
});