const express = require('express');
const router = express.Router();
const boardController = require('../../controllers/BoardController');
const verifyToken = require('../../middleware/VerifyToken')
const upload = require('../../middleware/upload')
const Joi = require('joi');

const boardValidationSchema = Joi.object({
    title: Joi.string(),
    cover: Joi.string(),
});


// Middleware kiểm tra và xác thực dữ liệu
const validateBoardData = (req, res, next) => {
    const { error, value } = boardValidationSchema.validate(req.body, {abortEarly: false});
    console.log(error)
    if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }
  
    // Dữ liệu hợp lệ, gán lại vào req.body và chuyển đến middleware tiếp theo hoặc xử lý logic
    req.body = value;
    next();
};


router.post('/',validateBoardData, verifyToken, upload.single('cover'),boardController.create)

router.get('/', verifyToken, boardController.getAll)

router.put('/:id',validateBoardData, verifyToken, upload.single('cover'), boardController.update)

router.delete('/:id', verifyToken, upload.single('cover'), boardController.delete)


module.exports = router;