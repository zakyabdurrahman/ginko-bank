const router = require('express').Router();
const userRouter = require('./userRouter');
const authRouter = require('./authRouter');
const loginMiddleware = require('../middlewares/loginMiddleware');
const Controller = require('../controllers/controller');

router.get('/', Controller.renderHome)
router.use(authRouter);
router.use('/user', userRouter);


module.exports = router;