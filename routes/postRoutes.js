const rescue = require('express-rescue');
const router = require('express').Router();
const postController = require('../controllers/postController');

router.post('/', rescue(postController.validatePost), rescue(postController.create));   
router.get('/', rescue(postController.getPosts));
router.get('/:id', rescue(postController.getPosts));
router.put('/:id', rescue(postController.validatePost), rescue(postController.update));

module.exports = router;