const router = require('express').Router();
const loginMiddleware = require('../middlewares/loginMiddleware');
const Controller = require('../controllers/controller');

//router untuk route /user

router.use(loginMiddleware);
router.get('/dashboard', Controller.renderUserDashboard);
router.get('/addAccount', Controller.renderAddAccount);

module.exports = router;