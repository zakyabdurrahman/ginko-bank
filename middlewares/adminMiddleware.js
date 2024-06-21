function adminMiddleware(req, res, next) {
    if (!req.session.user) {
        //redirect to login
        res.redirect('/login');
    } else if (req.session.user.role !== 'admin') {
        res.redirect('/user/dashboard');
    }
    else next(); 
}

module.exports = adminMiddleware;