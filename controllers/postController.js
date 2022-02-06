const postService = require('../services/postService');

const validatePost = (req, _res, next) => {
  const { title, content, categoryIds } = req.body;
  const { method } = req;
  const validation = postService.validatePost({ 
    title, 
    content, 
    categoryIds: method === 'PUT' ? [] : categoryIds,
  });
  if (validation.error) return next(validation.error);
  next();
};

const create = async (req, res, next) => {
  const { userId } = req;
  const { title, content, categoryIds } = req.body;
  const post = await postService.create({ title, content, categoryIds, userId });
  if (post.error) return next(post.error);
  res.status(201).json(post);
};

const getPosts = async (req, res, next) => {
  const { id } = req.params;
  const posts = await postService.getPosts(id);
  if (posts.error) return next(posts.error);
  res.status(200).json(posts);
};

const update = async (req, res, next) => {
  const { params: { id }, body: { title, content, categoryIds }, userId } = req;
  const updatePost = await postService.update({ id, title, content, categoryIds, userId });
  if (updatePost.error) return next(updatePost.error);
  res.status(200).json(updatePost);
};

module.exports = {
  create,
  validatePost,
  getPosts,
  update,
};