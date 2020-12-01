

class SiteController{
    //[GET/Site]
    index(req, res){
        res.redirect('/products');
    }
}

module.exports = new SiteController;