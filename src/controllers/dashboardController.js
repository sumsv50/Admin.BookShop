
const currentpage = 'dashboard'
class DashboardController{
    //[GET/DASHBOARD]
    index(req, res){
        res.render('dashboard', {currentpage});
    }
}

module.exports = new DashboardController;