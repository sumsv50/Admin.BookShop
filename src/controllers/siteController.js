const passport = require('passport');

class SiteController{
    //[GET] /
    index(req, res){
        res.redirect('/products');
    }

    //[GET] /login
    login(req, res){
        if(req.user) {
            res.redirect('/products');
        } else {
            res.render('login');
        }
    }

}

module.exports = new SiteController;