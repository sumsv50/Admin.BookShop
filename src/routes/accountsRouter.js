const express = require('express')
const router = express.Router()

//Controller
const accountsController = require('../controllers/accountsController');

// define the accounts page route
router.get('/', accountsController.index);

// [POST] accounts/store-admin-account
router.post('/store-admin-account', accountsController.storeAdminAccount);

module.exports = router;