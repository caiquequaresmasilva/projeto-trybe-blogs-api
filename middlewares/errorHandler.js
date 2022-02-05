const statusByErrorCode = {
    notFound: 404,
    alreadyExists: 409,
    'string.min': 400,
    'any.required': 400,
    'number.min': 422,
    'number.base': 422,
    'string.pattern.base': 400,
    'string.empty': 400,
    invalidFields: 400,
    unauthorized: 401,
  };
  
  module.exports = (error, _req, res, _next) => {
    if (error.isJoi) {
      const status = statusByErrorCode[error.details[0].type];
      return res.status(status).json({ message: error.details[0].message });
    }
    
    const status = statusByErrorCode[error.code] || 500;
    
    res.status(status).json({ message: error.message });
  };