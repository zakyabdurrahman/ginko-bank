//router untuk route login, register, logout
const router = require('express').Router();
const Controller = require('../controllers/controller');

router.get('/login', Controller.renderLogin);
router.post('/login', Controller.loginUser);
router.get('/logout', Controller.logoutUser);
router.get('/register', Controller.renderRegister);
router.post('/register', Controller.registerUser);

module.exports = router;