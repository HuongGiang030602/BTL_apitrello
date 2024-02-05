const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/VerifyToken.js')
const userController = require('../../controllers/UserController.js');

const Joi = require('joi');

const userValidationSchema = Joi.object({
  username: Joi.string().alphanum().required().messages({
    'any.required': `"username" không được bỏ trống !`
  }),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone: Joi.string().min(10).max(10).required(),
  age: Joi.number().min(18).required(),

});

// Middleware kiểm tra và xác thực dữ liệu
const validateUserData = (req, res, next) => {
    const { error, value } = userValidationSchema.validate(req.body, {abortEarly: false});
    console.log(error)
    if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }
  
    // Dữ liệu hợp lệ, gán lại vào req.body và chuyển đến middleware tiếp theo hoặc xử lý logic
    req.body = value;
    next();
};

//Gọi đến controller
//Thong tin của 1 user: username, email, phone, age
router.post('/',validateUserData,userController.create)

router.get('/',userController.getAll)

router.put('/:id',validateUserData, verifyToken,userController.update)

router.delete('/:id', userController.delete)



module.exports = router;