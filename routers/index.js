const router = require('express').Router();
const userRouter = require('./userRouter');
const authRouter = require('./authRouter');
const adminRouter = require('./adminRouter');
const loginMiddleware = require('../middlewares/loginMiddleware');
const Controller = require('../controllers/controller');

router.get('/', Controller.renderHome)
router.use(authRouter);
router.use('/user', userRouter);
router.use('/admin', adminRouter);


module.exports = router;