const express = require('express')
const router = express.Router()

//Controller
const accountsController = require('../../controllers/api/accountsController');

// [GET] /api/accounts/is-exist
router.get('/is-exist', accountsController.isExist);

// [GET] /api/accounts/edit-my-profile
router.get('/edit-my-profile', accountsController.editMyProfile);

// [GET] /api/accounts/edit-my-password 
router.get('/edit-my-password', accountsController.editMyPassword);

// [POST] /api/accounts/edit-my-avatar 
router.post('/edit-my-avatar', accountsController.editMyAvatar);

module.exports = router;