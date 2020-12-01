const express = require('express')
const router = express.Router()

//Controller
const siteController = require('../controllers/siteController');

// [GET] /
router.get('/', siteController.index);

module.exports = router;