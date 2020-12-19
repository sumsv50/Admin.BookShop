const adminAccountService = require('../../models/modelServices/adminAccountService');

class AccountsController{
    //[GET] /
    async isExist(req, res, next) {
        const isExist = await adminAccountService.checkExist(req.query.username);
        res.json({isExist});
    }
    
}

module.exports = new AccountsController;