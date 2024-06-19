function loginMiddleware(req, res, next) {
    if (!req.session.user) {
        //redirect to login
        res.redirect('/login');
    } else next(); 
}

module.exports = loginMiddleware;