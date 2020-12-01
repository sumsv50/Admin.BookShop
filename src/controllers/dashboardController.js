

class DashboardController{
    //[GET/DASHBOARD]
    index(req, res){
        res.render('dashboard');
    }
}

module.exports = new DashboardController;