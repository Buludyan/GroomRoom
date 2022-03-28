const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const userService = require('../service/userService');

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибка при регистрации", errors })
            }
            const { email, password, name, surname } = req.body;

            const userData = await userService.registration(email, password, name, surname);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

            return res.json({ ...userData })

        } catch (e) {
            console.log(e)
            res.json({ message: 'Registration error' })
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                console.log(1)
                return res.status(400).json({ message: `Пользователь не найден` })
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.json({ message: `Введен неверный пароль` })
            }
            return res.json({ message: 'Вы удачно вошли в систему' })
        } catch (e) {
            res.json({ message: 'Login error' })
        }
    }

    async logout(req, res, next) {
        try {

        } catch (e) {

        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);

            return res.redirect('https://www.facebook.com/')
        } catch (e) {

        }
    }

    async refresh(req, res, next) {
        try {

        } catch (e) {

        }
    }

    async getUsers(req, res, next) {
        try {

            res.json('Ответ')

        } catch (e) {

        }
    }
}


module.exports = new authController()