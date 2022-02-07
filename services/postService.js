const { BlogPost, PostsCategory, Category, User, Sequelize: { Op } } = require('../models');
const postSchema = require('../schemas/postSchema');

const validatePost = ({ title, content, categoryIds }) => {
  const validation = postSchema.validate({ title, content, categoryIds });
  return validation;
};

const validateCategories = async (categoryIds) => {
  const categories = await Category.findAll({ 
    where: { 
      id: categoryIds, 
    }, 
  });
  return categories.length === categoryIds.length;
};

const create = async ({ title, content, categoryIds, userId }) => {
  const validCategories = await validateCategories(categoryIds);
  if (!validCategories) { 
    return { error: { code: 'invalidFields', message: '"categoryIds" not found' } }; 
  }
  const date = new Date();
  const post = await BlogPost.create({ userId, title, content, published: date, updated: date });

  const categories = categoryIds.map((categoryId) => ({ postId: post.id, categoryId }));
  PostsCategory.bulkCreate(categories);
  return {
    id: post.id,
    userId,
    title,
    content,
  };
};

const getPosts = async (id) => {
  if (id) {
    const user = await BlogPost.findOne({
      where: { id },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    return user || { error: { code: 'notFound', message: 'Post does not exist' } };
  }
  return BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
};

const update = async ({ id, title, content, categoryIds, userId }) => {
  if (categoryIds) { 
    return { error: { code: 'invalidFields', message: 'Categories cannot be edited' } }; 
  }
  const [updatePost] = await BlogPost.update({ title, content }, { where: { id, userId } });
  if (!updatePost) { 
    return { error: { code: 'unauthorized', message: 'Unauthorized user' } }; 
  }
  return BlogPost.findOne({
    where: { id },
    attributes: ['title', 'content', 'userId'],
    include: [{ model: Category, as: 'categories', through: { attributes: [] } }],
  });
};

const destroy = async ({ userId, id }) => {
  const post = await BlogPost.findOne({
     where: { id }, attributes: ['userId'], 
  });
  if (!post) return { error: { code: 'notFound', message: 'Post does not exist' } };
  if (userId !== post.dataValues.userId) { 
    return { error: { code: 'unauthorized', message: 'Unauthorized user' } }; 
  } 
  return BlogPost.destroy({ where: { id, userId } });
};

// Fonte: https://stackoverflow.com/questions/31258158/how-to-implement-search-feature-using-sequelizejs
const search = async ({ q }) => {
  if (!q) return getPosts();
  const post = await BlogPost.findAll({
    where: {
      [Op.or]: [{ title: { [Op.like]: `%${q}%` } }, { content: { [Op.like]: `%${q}%` } }],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return post;
};

module.exports = {
  create,
  validatePost,
  getPosts,
  update,
  destroy,
  search,
};