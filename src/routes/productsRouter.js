const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');

router.get('/', productsController.index);
router.get('/create-product', productsController.createProduct);
router.post('/store', productsController.storeProduct);
router.get('/:id/edit', productsController.edit);
router.put('/:id', productsController.update);
router.delete('/:id', productsController.delete);

module.exports = router;


