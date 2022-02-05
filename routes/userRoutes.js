const rescue = require('express-rescue');
const router = require('express').Router();
const userController = require('../controllers/userController');
const authValidation = require('../middlewares/authValidation');

router.post('/', rescue(userController.validateUser), rescue(userController.create));
router.get('/', rescue(authValidation), rescue(userController.getUsers));

module.exports = router;