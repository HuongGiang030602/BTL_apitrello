const express = require('express');
const router = express.Router();
const boardRoutes = require('./boardRoutes');
const listRoutes = require('./listRoutes');
const cardRoutes = require('./cardRoutes');
const authRoute = require('./authRoute')
const userRouter = require('./userRoutes');

router.get('/status', (req, res) => {
  res.status(200).json({msg:'API are ready !'});
});

router.use('/users',userRouter)
router.use('/auth',authRoute)
router.use('/boards',boardRoutes);
router.use('/lists',listRoutes);
router.use('/cards',cardRoutes);



module.exports = router;
