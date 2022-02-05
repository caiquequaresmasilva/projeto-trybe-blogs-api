const rescue = require('express-rescue');
const router = require('express').Router();
const categoryController = require('../controllers/categoryController');

router.post('/', rescue(categoryController.validateCategory), rescue(categoryController.create));

module.exports = router;