const { Router } = require('express');
const router = Router();
const authController = require('../controllers/authController');
const {body} = require("express-validator");
const authMiddleware = require('../middlewares/authMiddleware'); 

router.post('/registration', [
    body('email', "Wrong email").isEmail(),
    body('password', "Wrong password length").isLength({min:3, max:32})
], authController.registration)

router.post('/login', authController.login);

router.post('/logout', authController.logout);

router.get('/activate/:link', authController.activate);

router.get('/refresh', authController.refresh);

router.get('/users', authMiddleware, authController.getUsers);

module.exports = router;