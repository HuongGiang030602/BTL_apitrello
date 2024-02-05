const express = require('express');
const AuthController = require('../../controllers/AuthController');
const router = express.Router();

//Định nghĩa router và gọi đến controller
router.post('/login', AuthController.login);

module.exports = router