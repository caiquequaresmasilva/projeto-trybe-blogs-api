const jwt = require('jsonwebtoken');
const { User } = require('../models');
const userSchema = require('../schemas/userSchema');

const { JWT_SECRET } = process.env;

const validateUser = ({ displayName, email, password }) => {
  const validation = userSchema.validate({ displayName, email, password });
  return validation;
};

const authValidation = (token) => {
  if (!token) return { error: { code: 'unauthorized', message: 'Token not found' } };
  try {
    const user = jwt.verify(token, JWT_SECRET);
    return user;
  } catch (_) {
    return { error: { code: 'unauthorized', message: 'Expired or invalid token' } };
  }
};

const generateToken = (payload) => jwt.sign(payload, JWT_SECRET, {
  algorithm: 'HS256',
  expiresIn: '1d',
});

const create = async ({ displayName, email, password, image }) => {
  const user = await User.findOne({ where: { email } });
  if (user) return { error: { code: 'alreadyExists', message: 'User already registered' } };

  const newUser = await User.create({ displayName, email, password, image });
  const { password: _, ...userCreated } = newUser.dataValues;

  const token = generateToken(userCreated);

  return { token };
};

const getUsers = async (id) => {
  if (id) {
    const user = await User.findByPk(id);
    return user || { error: { code: 'notFound', message: 'User does not exist' } };
  }
  return User.findAll();
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user || password !== user.password) { 
    return { error: { code: 'invalidFields', message: 'Invalid fields' } }; 
  } 

  const token = generateToken({ email, id: user.id });

  return { token };
};

const destroy = async ({ userId }) => User.destroy({ where: { id: userId } });

module.exports = {
  create,
  validateUser,
  login,
  authValidation,
  getUsers,
  destroy,
};