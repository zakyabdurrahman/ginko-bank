const router = require('express').Router();
const loginMiddleware = require('../middlewares/loginMiddleware');
const Controller = require('../controllers/controller');

//router untuk route /user

router.use(loginMiddleware);
router.get('/dashboard', Controller.renderUserDashboard);
router.get('/addAccount', Controller.renderAddAccount);
router.post('/addAccount', Controller.addAccount);
router.get('/account/:accountNumber/topup', Controller.renderTopup);
router.post('/account/:accountNumber/topup', Controller.topup)
router.get('/account/:accountNumber/transfer', Controller.renderTransfer);
router.post('/account/:accountNumber/transfer', Controller.transfer);
router.get('/account/:accountNumber', Controller.renderDetailAccount);

module.exports = router;