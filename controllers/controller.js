const bcrypt = require('bcryptjs')
const {User} = require('../models/index')

class Controller {
    static async registerUser(req, res) {
        const {email, password} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        //chaining to db here (user then bio)

        //login the user here
        /*
        req.session.user = {
            id:
            role:
        }
        */
    }

    static async renderUserDashboard(req, res) {
        try {
            res.render('dashboard')
        } catch(error) {
            console.log(error)
            res.send(error)
        }
    }

    static async renderLogin(req, res) {
        try {
            res.render('login')
        } catch(error) {
            console.log(error)
            res.send(error)
        }
    }

    static async renderRegister(req, res) {
        try {
            res.render('register');
        } catch(error) {
            console.log(error)
            res.send(error)
        }
    }

    static async renderHome(req, res) {
        try {
            res.render('home');
        } catch(error) {
            console.log(error)
            res.send(error)
        }
    }
}

module.exports = Controller;