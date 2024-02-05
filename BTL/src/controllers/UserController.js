const e = require("express");
const UserService = require("../services/userService");

class UserController{
    
    //create => POST
    create = async(req,res,next) => {
        try {
            const {username, email, phone, password,age} = req.body;
            // abc();
            //Gọi đến tầng service
            let data = {
                username, email, phone, password,age
            }

            let dataUser = {
                username, email, phone, password
            }

            const userSignUp = await UserService.checkSignUp(dataUser)

            if (userSignUp) {
                res.status(200).json({
                    'msg': userSignUp
                })
            } else {
                const user = await UserService.createUser(data)
                res.status(200).json({
                    'msg' : 'Đăng ký thành công !',
                    user
                })
            }

        } catch (error){
            next (error);
        }
    }
    
    //get => GET
    getAll= async (req,res,next) => {
        try {
           const users = await UserService.getAll();
           res.status(200).json((
            users
           ))
        } catch (error){
            throw error;
        }
    }

    // update => PUT
    update = async(req,res,next) => {
        try {
            const {username, email, phone, password,age} = req.body;
            const{id} = req.params;
            // abc();
            //Gọi đến tầng service
            let data = {
                username, email, phone, password,age
            }

            const result = await UserService.checkId(id);
            if (!result) {
                return res.status(404).json({ error: 'Không tìm thấy!' });
            }
              
            const userPut = await UserService.updateUser(id, data);
            if (!userPut) {
                throw new Error('Cập nhật thông tin người dùng không thành công');
            }
              
            const user = await UserService.getUser(id);
            return res.status(200).json({
                "msg": 'Cập nhật thành công thông tin người dùng',
                user
            });

        } catch (error){
            next (error);
        }
    }

    //delete => DELETE
    delete = async(req,res,next) => {
        try {
            const{id} = req.params;
            // abc();
            //Gọi đến tầng service
            
            const result = await UserService.deleteUser(id);
            // console.log(result)
            if(result) {
                res.status(200).json({'msg': `Xoá thông tin user thành công`});
            }else {
                throw new Error(`Xoá không thành công`);
            }
         
        } catch (error){
            next (error);
        }
    }
}





module.exports = new UserController();