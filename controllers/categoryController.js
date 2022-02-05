const categoryService = require('../services/categoryService');

const validateCategory = (req, _res, next) => {
  const { name } = req.body;
  const validation = categoryService.validateCategory({ name });
  if (validation.error) return next(validation.error);
  next();
};

const create = async (req, res) => {
  const { name } = req.body;
  const category = await categoryService.create({ name });
  res.status(201).json(category); 
};

module.exports = {
  create,
  validateCategory,
    
};