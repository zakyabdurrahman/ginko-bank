const bcrypt = require('bcryptjs');
const {User, Bio, Currency, Account, Transfer} = require('../models/index');
const {generateAccountNumber} = require('../helpers/helpers');
const {Op} = require('sequelize');

class AdminController {
    static async renderDashboard(req, res) {
        try {
            const accounts = await Account.findAll({
                include: [{
                    model: User,
                    include: Bio
                }, Currency]
            });

            res.render('admin', {accounts})
        } catch(error) {
            console.log(error)
            res.send(error)
        }
    }
}

module.exports = AdminController;