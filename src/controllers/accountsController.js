const adminAccountService = require('../models/modelServices/adminAccountService');

const currentTab = 'accounts'
class AccountsController{
    //[GET/accounts]
    index(req, res){
        res.render('accounts', {currentTab});
    }

    // [POST] accounts/store-admin-account
    async storeAdminAccount(req, res, next) {
        try {
            const newAdmin = req.body;
            await adminAccountService.addAdmin(newAdmin);
            res.redirect('/accounts');
        } catch(err) { next(err) };
    }
}

module.exports = new AccountsController;