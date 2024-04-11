const {User} = require('../models/models')
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { where } = require('sequelize')

const generateJwt = (ID_Usera, Login) => {
    return jwt.sign(
        {ID_Usera, Login},
         process.env.SECRET_KEY,
        {expiresIn: '24d'})
}

class UserController {
    async registration(req, res) {
        const {Login, Password, Birthday, Email} = req.body
        if(!Login || !Password){
            return next(ApiError.badRequest('Неккоретный Логин или Пароль'))
        }
        const candidate = await User.findOne({where: {Login}})
        if(candidate){
            return next(ApiError.badRequest('Пользователь с таким Логином уже существует'))
        }
        const hashPassword = await bcrypt.hash(Password, 5)
        const user = await User.create({Login, Password: hashPassword, Birthday, Email})
        const token = generateJwt(user.ID_Usera, user.Login)

        return res.json({token})
    }
    async login(req, res, next){
        const {Login, Password} = req.body
        const user = await User.findOne({where: {Login}})
        if(!user){
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(Password, user.Password)
        if(!comparePassword){
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.ID_Usera, user.Login)
        return res.json({token})
    }
    async check(req, res, next){
        const token = generateJwt(req.user.ID_Usera, req.user.Login)
        return res.json({token})
    }
    async getProfile(req, res){
        try {
            const token = req.headers.authorization.split(' ')[1]; // Получаем токен из заголовка запроса
            const decoded = jwt.verify(token, process.env.SECRET_KEY); // Декодируем токен
    
            const user = await User.findOne({where: {ID_Usera: decoded.ID_Usera}});
            if (!user) {
                return res.status(404).json({ error: 'Пользователь не найден' });
            }
    
            user.Login = req.body.Login || user.Login;
            user.Email = req.body.Email || user.Email;
            user.Birthday = req.body.Birthday || user.Birthday;
            
            return res.json({
                Login: user.Login,
                Email: user.Email,
                Birthday: user.Birthday
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Произошла ошибка при получении профиля пользователя' });
        }
    }
    
}

module.exports = new UserController()