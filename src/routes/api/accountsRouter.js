const express = require('express')
const router = express.Router()

//Controller
const accountsController = require('../../controllers/api/accountsController');

// [GET] /
router.get('/is-exist', accountsController.isExist);

module.exports = router;