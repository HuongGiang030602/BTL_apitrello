const jwt = require('jsonwebtoken');
const UserService = require('../services/userService')

class AuthController {

    login = async (req, res, next) =>{
        try {
            const {username, password} = req.body;

            // check username and password
            // if true => create jwt token

            const user = await UserService.checkUserData(username, password);
            if (!user) {
                res.status(404).json({
                    message: 'Tên người dùng hoặc mật khẩu không chính xác'
            });
            return;
            }

            const token = jwt.sign({ username }, process.env.SECRET_KEY_JWT);

            res.status(200).json({
                'msg' : 'Đăng nhập thành công',
                token: token,
                user
            })

        } catch (error) {
            next(error)
        }
    }
    
}

module.exports = new AuthController();