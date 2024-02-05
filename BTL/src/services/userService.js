const User = require("../models/User");
const bcrypt = require('bcrypt');

class UserService {

    checkUserData = async(username,password) => {
        try {
            const user = await User.findOne({ username});
            if (!user) {
                throw new Error('Tài khoản không tồn tại. Vui lòng đăng kí tài khoản!');
            }
            const decryption = await bcrypt.compare(password, user.password);
            if (!decryption) {
                throw new Error('Mật khẩu không đúng!');
            }

            return user;
        } catch (error) {
            throw new Error('Đã xảy ra lỗi khi kiểm tra dữ liệu người dùng');
        }
    }

    checkSignUp = async (data) => {
        try {
            const errors = [];

            const user = await User.findOne({ username: data.username });
            if (user) {
                errors.push('Username đã tồn tại');
            }
        
            const email = await User.findOne({ email: data.email });
            if (email) {
                errors.push('Email đã tồn tại');
            }
        
            const phone = await User.findOne({ phone: data.phone });
            if (phone) {
                errors.push('Phone đã tồn tại');
            }
        
            // Kiểm tra password
            const passwordUser = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
            if (!passwordUser.test(data.password)) {
                errors.push('Password không đúng định dạng. Password phải có ít nhất 8 kí tự, ít nhất 1 kí tự viết hoa, 1 kí tự viết thường và 1 số');
            }
        
            if (errors.length > 0) {
                return errors;
            }
        
            // Nếu không có lỗi, trả về null
            return null;
    
        } catch (err) {
            throw err;
        }
    }

    checkId = async (id) => { 
        try {
            const user = await User.findOne({_id: id}); 
            return user;
          } catch (error) {
            throw new Error('Không tồn tại User này');
          }
        }

    getUser = async (id) => {
        try {
            const user = await User.findById(id);
            return user;
        } catch (error) {
            throw error;
        }
    }
    
    
    async createUser(userData){
        try {
            // Xử lý nghiệp vụ và tương tác với tầng model
            const user = new User(userData);
            await user.save();
            return user;
        } catch (error) {
            throw error;
        }
    }

    getAll = async () => {
        try {
            const users = await User.find();
            return users;
        } catch (error) {
            throw error;
        }
    }

    async updateUser(id,data){
        try {
            const hashPassword = async (password) => {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                return hashedPassword;
            };

            const hashedPassword = await hashPassword(data.password);

            const result = await User.updateOne({_id: id}, {
                username: data.username, 
                password: hashedPassword,
                email: data.email,
                phone: data.phone,
                age: data.age})
            return true;
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(id,data){
        try {

            const user = await User.findById(id);
            console.log(user);
            await user.deleteOne();
           
            return true
        } catch (error) {
            throw new Error('Id không tồn tại');
        }
    }
}

module.exports = new UserService();