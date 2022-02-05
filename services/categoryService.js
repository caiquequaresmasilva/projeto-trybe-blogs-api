const { Category } = require('../models');
const categorySchema = require('../schemas/categorySchema');

const validateCategory = ({ name }) => {
  const validation = categorySchema.validate({ name });
  return validation;
};

const create = async ({ name }) => Category.create({ name });

module.exports = {
  create,
  validateCategory,
  
};