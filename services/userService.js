const jwt = require('jsonwebtoken');
const { User } = require('../models');
const userSchema = require('../schemas/userSchema');

const validateUser = ({ displayName, email, password }) => {
  const validation = userSchema.validate({ displayName, email, password });
  return validation;
};

const create = async ({ displayName, email, password, image }) => {
  const user = await User.findOne({ where: { email } });
  if (user) return { error: { code: 'alreadyExists', message: 'User already registered' } };

  const newUser = await User.create({ displayName, email, password, image });
  const { password: _, ...userCreated } = newUser.dataValues;

  const token = jwt.sign(userCreated, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '1d',
  });

  return { token };
};

module.exports = {
  create,
  validateUser,
};