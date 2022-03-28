const { Router } = require('express');
const router = Router();
const controller = require('../controllers/authController');
const {check} = require("express-validator");

router.post('/registration', [
    check('email', "Wrong email").isEmail(),
    check('password', "Wrong password length").isLength({min:4, max:10})
], controller.registration)

router.post('/login', controller.login);

router.post('logout', controller.logout);

router.get('/activate/:link', controller.activate);

router.get('/refresh', controller.refresh);

router.get('/users', controller.getUsers);

module.exports = router;