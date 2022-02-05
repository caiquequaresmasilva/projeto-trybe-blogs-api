const { BlogPost, PostsCategory, Category } = require('../models');
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

module.exports = {
  create,
  validatePost,
  
};