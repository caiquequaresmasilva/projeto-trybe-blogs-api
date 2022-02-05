const userService = require('../services/userService');

module.exports = async (req, _res, next) => {
  const { authorization } = req.headers;
  const validation = userService.authValidation(authorization);
  if (validation.error) return next(validation.error);
  next();
};