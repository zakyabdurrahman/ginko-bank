const router = require('express').Router();
const loginMiddleware = require('../middlewares/loginMiddleware');
const AdminController = require('../controllers/adminController');

//router untuk route /admin

router.use(loginMiddleware);
router.get('/dashboard', AdminController.renderDashboard);
router.get('/suspend/:accountId', AdminController.suspendAccount);

module.exports = router