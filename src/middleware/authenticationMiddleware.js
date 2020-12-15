const allowUrl = ['login'];


const authenticationMiddleware = (req, res, next) => {
    if(req.url == '/login' || req.user) {
       return next();
    } 

    res.redirect('/login');
}

module.exports = authenticationMiddleware;