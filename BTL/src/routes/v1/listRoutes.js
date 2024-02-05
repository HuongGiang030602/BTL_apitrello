const express = require('express');
const router = express.Router();
const listController = require('../../controllers/ListController');
const verifyToken = require('../../middleware/VerifyToken')
const Joi = require('joi');

const listValidationSchema = Joi.object({
    title: Joi.string().required(),
    idBoard: Joi.string().required()
    
});


// Middleware kiểm tra và xác thực dữ liệu
const validateListData = (req, res, next) => {
    const { error, value } = listValidationSchema.validate(req.body, {abortEarly: false});
    console.log(error)
    if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }
  
    // Dữ liệu hợp lệ, gán lại vào req.body và chuyển đến middleware tiếp theo hoặc xử lý logic
    req.body = value;
    next();
};


router.post('/',validateListData, verifyToken,listController.create)

router.get('/:idBoard', verifyToken,listController.getAll)

router.put('/:idList', verifyToken,listController.update)

router.delete('/:idList',verifyToken ,listController.delete)


module.exports = router;