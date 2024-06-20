//router untuk route login, register, logout
const router = require('express').Router();
const Controller = require('../controllers/controller');

router.get('/login', Controller.renderLogin);
router.get('/register', Controller.renderRegister);

module.exports = router;