const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const UserDto = require('../dtos/userDto');
const mailService = require('./mailService');
const User = require('../models/userSchema');
const tokenService = require('./tokenService');
const ApiError = require('../exceptions/apiError');


class UserService {
    async registration(email, password, name, surname) {
        const candidate = await User.findOne({ email });
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
        }

        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();

        const user = await User.create({ email, password: hashPassword, name, surname, activationLink });
        await mailService.sendActivationMail(email, `${process.env.API_URL}/auth/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async activate(activationLink) {
        const user = await User.findOne({ activationLink })
        if (!user) {
            throw ApiError.BadRequest('Неккоректная ссылка активации');
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await User.findOne({ email });

        if (!user) {
            throw ApiError.BadRequest('Пользователь не найден')
        }

        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            throw ApiError.BadRequest('Введен неверный пароль')
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }
}

module.exports = new UserService();