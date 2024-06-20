const bcrypt = require('bcryptjs');
const {User, Bio, Currency, Account, Transfer} = require('../models/index');
const {generateAccountNumber} = require('../helpers/helpers');
const {Op} = require('sequelize');


class Controller {
    static async registerUser(req, res) {
        const {email, password, fullName, dateOfBirth, address, phoneNumber} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        //chaining to db here (user then bio)
        const newUser = await User.create({
            email,
            password: hashedPassword,
            role: 'user'
        });
        //create the bio
        await Bio.create({
            fullName,
            dateOfBirth,
            address,
            phoneNumber,
            UserId: newUser.id

        })
        //login the user here
        req.session.user = {
            id: newUser.id,
            role: 'user'
        }
        /*
        req.session.user = {
            id:
            role:
        }
        */
       res.redirect('/user/dashboard')
    }

    static async renderUserDashboard(req, res) {
        try {
            const userData = await Bio.findOne({
                where : {UserId: req.session.user.id},
            });
            const userAccounts = await Account.findAll({
                where: {UserId: req.session.user.id},
                include: Currency
            })
            res.render('dashboard', {userData, userAccounts});
        } catch(error) {
            console.log(error)
            res.send(error)
        }
    }

    static async renderLogin(req, res) {
        try {
            let {error} = req.query;
            error = error ? error : '';
            res.render('login', {error})
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

    static async logoutUser(req, res) {
        try {
            req.session.destroy(() => {});
            res.redirect('/');
        } catch(error) {
            console.log(error)
            res.send(error)
        }
    }

    static async loginUser(req, res) {
        try {
            //find the user
            const {email, password} = req.body;
            const user = await User.findOne({where: {email}})
            //if user found compare password
            if (user) {
                //if password same redirect to dashboard
                if (bcrypt.compareSync(password, user.password)) {
                    req.session.user = {
                        id: user.id,
                        role: user.role
                    };
                    res.redirect('/user/dashboard')
                }
                else {
                    const message = `wrong password`
                    res.redirect(`/login?error=${message}`);
                }

            } else {
                //send error if no user found
                const message = `user not found`;
                res.redirect(`/login?error=${message}`);
            }
        } catch(error) {
            console.log(error)
            res.send(error)
        }
    }

    static async renderAddAccount(req, res) {
        try {
            const currencies = await Currency.findAll();
            res.render('addAccount', {currencies});
        } catch(error) {
            console.log(error)
            res.send(error)
        }        
    }

    static async addAccount(req, res) {
        try {
            const {CurrencyId} = req.body;
            const UserId = req.session.user.id;
            let accountNumber = 0;
            //generate a uniq account number then check if already exist, if so continue until none
            accountNumber = String(generateAccountNumber()) 
            let sameNumber = await Account.findOne({where: {accountNumber}})
            while (sameNumber) {
                accountNumber = String(generateAccountNumber()) 
                sameNumber = await Account.findOne({where: {accountNumber}})
            }

            //then make the account
            const newAccount = await Account.create({
                accountNumber,
                amount: 0,
                UserId,
                CurrencyId,
                active: true
            })
            


            res.redirect(`/user/dashboard?message=${accountNumber}`)
            
        } catch(error) {
            console.log(error)
            res.send(error)
        }
    }

    static async renderDetailAccount(req, res) {
        try {
            const {accountNumber} = req.params;
            const account = await Account.findOne({
                where: {
                    accountNumber: accountNumber
                },
                include: Currency
            });
            const bio = await Bio.findOne({where: {
                UserId: account.UserId
            }});
            //find the user then the bio;
            const transfers = await Transfer.findAll({
                where: {
                    [Op.or]: [{ReceiverAccountNumber: accountNumber}, {AccountId: account.id}]
                }
            });
            res.render('detailAccount', {account, bio, transfers});
        } catch(error) {
            console.log(error)
            res.send(error)
        }
    }

    static async renderTransfer(req, res) {
        try {
            //findout the currency
            let {error} = req.query;
            //handle error
            error = error ? error : '';
            const {accountNumber} = req.params;
            const account = await Account.findOne({
                where: {
                    accountNumber
                },
                include: Currency
            })
            res.render('formTransfer', {account, error});
        } catch(error) {
            console.log(error)
            res.send(error)
        }
    }

    static async renderTopup(req, res) {
        try {
            const {accountNumber} = req.params;
            const account = await Account.findOne({
                where: {
                    accountNumber
                },
                include: Currency
            })
            res.render('accountTopup', {account});
        } catch(error) {
            console.log(error)
            res.send(error)
        }
    }

    static async topup(req, res) {
        try {
            //convert the inputted value
            const {accountNumber} = req.params;
            const {amount} = req.body;
            const account = await Account.findOne({
                where: {
                    accountNumber
                },
                include: Currency
            })
            const convertedAmount = Math.floor(amount / account.Currency.idrValue);
            await account.increment('amount', {by: convertedAmount});
            res.redirect(`/user/account/${accountNumber}`)

        } catch(error) {
            console.log(error)
            res.send(error)
        }
    }
    
    static async transfer(req, res) {
        try {
            const {ReceiverAccountNumber, amount, info} = req.body;
            const {accountNumber} = req.params;
            //findout if target exist
            const account = await Account.findOne({
                where: {
                    accountNumber
                }
            })
            const targetAccount = await Account.findOne({
                where: {
                    accountNumber: ReceiverAccountNumber
                },
                include: Currency
            })

            if (!targetAccount) {
                const message = "No Rekening tidak ditemukan";
                res.redirect(`/user/account/${accountNumber}/transfer?error=${message}`);
            } else if (amount > account.amount) {
                const message = "Saldo anda tidak mencukupi";
                res.redirect(`/user/account/${accountNumber}/transfer?error=${message}`);
            } else {
                //success
                //substract
                account.decrement('amount', {by: amount});
                //add
                targetAccount.increment('amount', {by: amount});
                //create transfer record
                await Transfer.create({
                    amount,
                    type: 'Pengeluaran',
                    info,
                    CurrencyId: account.CurrencyId,
                    AccountId: account.id,
                    ReceiverAccountNumber
                })
                res.redirect(`/user/account/${accountNumber}`)
            }
            
        } catch(error) {
            console.log(error)
            res.send(error)
        }
    }

    
    
}

module.exports = Controller;