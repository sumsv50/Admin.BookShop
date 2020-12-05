
const currentPage = 'dashboard'
class DashboardController{
    //[GET/DASHBOARD]
    index(req, res){
        res.render('dashboard', {currentPage});
    }
}

module.exports = new DashboardController;