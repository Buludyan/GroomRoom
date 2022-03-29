const bcrypt = require('bcryptjs');
const ApiError = require('../exceptions/apiError');
const userService = require('../service/userService');
const { validationResult } = require('express-validator');

class AuthController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()));
            }
            const { email, password, name, surname } = req.body;

            const userData = await userService.registration(email, password, name, surname);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

            return res.json(userData)

        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ message: `Пользователь не найден` })
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.json({ message: `Введен неверный пароль` })
            }
            return res.json({ message: 'Вы удачно вошли в систему' })
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);

            return res.redirect('https://www.facebook.com/')
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    }

    async getUsers(req, res, next) {
        try {

            res.json('Ответ')

        } catch (e) {
            next(e);
        }
    }
}


module.exports = new AuthController()