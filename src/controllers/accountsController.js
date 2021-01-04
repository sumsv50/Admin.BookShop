const adminAccountService = require('../models/modelServices/adminAccountService');
const userAccountService = require('../models/modelServices/userAccountService');
const formidable = require('formidable');
const cloudinary = require('../config/Cloudinary/index');

const currentTab = 'accounts'
class AccountsController{
    //[GET/accounts]
    index(req, res){
        res.render('accounts/accounts', {currentTab});
    }

    // [POST] accounts/store-admin-account
    async storeAdminAccount(req, res, next) {
        try {
            const form = formidable({multiples: true});

            form.parse(req, async (err, fields, files) => {
                try{
                    if(err) {
                        next(err);
                        return;
                    }

                    const img = files.adminImg;
                    if(img && img.size>0) {
                        const result = await cloudinary.uploadToCloudinary(img.path, 'admin-img');
                        fields.public_id_avt = result.public_id;
                        fields.avt_img = result.url;
                    }

                    await adminAccountService.addAdmin(fields);
                    res.redirect('/accounts');
                }catch(err) { next(err) };
            });
           
        } catch(err) { next(err) }; 
    }

    // [GET] accounts/my-profile
    async showMyProfile(req, res, next) {
        if(!req.user) next(err);
        else {
            res.render('accounts/my-profile', {user: req.user});
        }
    }

    // [GET] accounts/:id/view
    async view(req, res, next) {
        res.send('ahihi');
    }

}





module.exports = new AccountsController;