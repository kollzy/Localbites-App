// app_server/routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');


console.log(authController);  

router.get('/login', authController.loginForm);
router.post('/login', authController.processLogin);
router.get('/register', authController.registerForm);
router.post('/register', authController.processRegister);
router.get('/welcome', authController.welcomePage);
router.get('/logout', authController.logout); 

module.exports = router;
