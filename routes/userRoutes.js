const rescue = require('express-rescue');
const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/', rescue(userController.validateUser), rescue(userController.create));

module.exports = router;