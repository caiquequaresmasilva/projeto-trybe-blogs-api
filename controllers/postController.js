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

const destroy = async (req, res, next) => {
  const { userId, params: { id } } = req;
  const deletePost = await postService.destroy({ id, userId });
  if (deletePost.error) return next(deletePost.error);
  res.status(204).end();
};

const search = async (req, res) => {
  const { q } = req.query;
  const post = await postService.search({ q });
  res.status(200).json(post);
};

module.exports = {
  create,
  validatePost,
  getPosts,
  update,
  destroy,
  search,
};