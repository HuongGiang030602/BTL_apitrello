const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password : {type: String, require: true},
  phone: {type: String, require: true, unique: true},
  age: { type: Number, min: 18 },

});

userSchema.pre('save', function(next) {
  const user = this;

  // Chỉ mã hoá mật khẩu nếu nó mới hoặc đã thay đổi
  if (!user.isModified('password')) {
    return next();
  }

  // Mã hoá mật khẩu với bcrypt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }

      // Gán mật khẩu đã mã hoá cho người dùng
      user.password = hash;
      next();
    });
  });
});

const isValidMembers = async (members) => {
  return await User.find({ _id: { $in: members } }).countDocuments() === members.length;
};



const User = mongoose.model('User', userSchema);

module.exports = User;