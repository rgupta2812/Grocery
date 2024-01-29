const express = require('express');
const { validate } = require('express-validation');
const validation = require('../middleware/validation');
const loginController = require('../controller/login');

const router = express.Router();

router.post('/check_creds', validate(validation.login), loginController.login);
router.put('/create_new_user' , validate(validation.create_user) , loginController.createUser);

module.exports = router;