const router = require('express').Router();
const loginMiddleware = require('../middlewares/loginMiddleware');
const AdminController = require('../controllers/adminController');
const adminMiddleware = require('../middlewares/adminMiddleware');

//router untuk route /admin

router.use(loginMiddleware, adminMiddleware);
router.get('/dashboard', AdminController.renderDashboard);
router.get('/suspend/:accountId', AdminController.suspendAccount);

module.exports = router