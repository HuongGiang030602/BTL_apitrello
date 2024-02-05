const express = require('express');
const router = express.Router();
const cardController = require('../../controllers/CardController')
const verifyToken = require('../../middleware/VerifyToken')
const upload = require('../../middleware/upload')

const Joi = require('joi');


const cardValidationSchema = Joi.object({
    title: Joi.string().alphanum().messages({
      'any.required': `"title" không được bỏ trống !`
    }),
    idList: Joi.string(),
    cover: Joi.array(),
    member: Joi.array(),
    describe: Joi.string(),
    attachment: Joi.array(),
    due_date : Joi.date()
});


// Middleware kiểm tra và xác thực dữ liệu
const validateCardData = (req, res, next) => {
    const { error, value } = cardValidationSchema.validate(req.body, {abortEarly: false});
    console.log(error)
    if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }
  
    // Dữ liệu hợp lệ, gán lại vào req.body và chuyển đến middleware tiếp theo hoặc xử lý logic
    req.body = value;
    next();
};


router.post('/',validateCardData, verifyToken, upload.fields([
  { name : 'cover', maxCount :1 },
  { name : 'attachment', maxCount :5 },
]), cardController.create)

router.get('/:idList', verifyToken, cardController.getAll)
router.get('/getCard/:idCard', cardController.getCard);


router.put('/:idCard',validateCardData, verifyToken, upload.fields([
  { name : 'cover', maxCount :1 },
  { name : 'attachment', maxCount :5 },
]), cardController.update)

router.delete('/:idCard', verifyToken, cardController.delete)


module.exports = router;