const rescue = require('express-rescue');
const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/', (request, response) => {
    response.send();
  });
router.post('/login', rescue(userController.validateUser), rescue(userController.login));

module.exports = router;