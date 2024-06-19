const router = require('express').Router();
const userRouter = require('./userRouter');
const loginMiddleware = require('../middlewares/loginMiddleware');
const Controller = require('../controllers/controller');

router.get('/login', Controller.renderLogin);
router.use('/user', userRouter);


module.exports = router;