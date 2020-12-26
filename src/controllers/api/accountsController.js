const { error } = require('jquery');
const formidable = require('formidable');
const adminAccountService = require('../../models/modelServices/adminAccountService');
const cloudinary = require('../../config/Cloudinary/index');

class AccountsController{
    //[GET] /
    async isExist(req, res, next) {
        const isExist = await adminAccountService.checkExist(req.query.username);
        res.json({isExist});
    }

    //[GET] /api/accounts/edit-my-profile
    async editMyProfile(req, res, next) {
        try {
            await adminAccountService.editMyProfile(req.user._id, req.query);
            res.json(req.query);
        } catch(err) { 
            res.json({name: 'Error'});
        };
    }

    //[GET] /api/accounts/edit-my-password
    async editMyPassword(req, res, next) {
        try {
            var values = req.query.formValues;
           
            var admin = await adminAccountService.checkCredential(req.user.username, values.current_password);
            if(admin) {
                await adminAccountService.updatePassword(req.user._id, values.new_password);
                res.json({isSuccess: true});

            } else {
                res.json({
                    isSuccess: false,
                    message: 'Current password is incorrect!',        
                });
            }
            
        } catch(err) { 
            console.log(err);
            res.json({
                isSuccess: false,
                message: 'Update Fail! System error', 
            });
        };
    }

    //[GET] /api/accounts/edit-my-avatar
    async editMyAvatar(req, res, next) {
        const form = formidable({multiples: true});
        const user = req.user;
        form.parse(req, async (err, fields, files) => {
            try{
                if(err) {
                    res.json({isSuccess: false});
                    return;
                }
                const img = files.avt_img;
                if(img && img.size>0) {
                    //Save old img avt
                    var old_public_id_avt = user.public_id_avt;

                    const result = await cloudinary.uploadToCloudinary(img.path, 'admin-img');
                    
                    await adminAccountService.updateAvatar(user._id, result.url, result.public_id);

                    res.status(200).json({isSuccess: true});

                    //If success, delete old img avt
                    if(old_public_id_avt) {
                        var public_ids = [old_public_id_avt];
                        await cloudinary.delete_resources(public_ids, {});
                    }
                } else {
                    res.json({isSuccess: false});
                };
             
            } catch(err) { 
                console.log(err);
                res.json({isSuccess: false}); };
            
        });

    }
    
}

module.exports = new AccountsController;