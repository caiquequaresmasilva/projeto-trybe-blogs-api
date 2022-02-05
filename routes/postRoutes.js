const rescue = require('express-rescue');
const router = require('express').Router();
const postController = require('../controllers/postController');

router.post('/', rescue(postController.validatePost), rescue(postController.create));

module.exports = router;