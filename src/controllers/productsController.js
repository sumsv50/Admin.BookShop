const productService = require('../models/modelServices/ProductService');
const categoryService = require('../models/modelServices/categoryService');


const currentPage= 'product';

class ProductsController {

    // [GET] /products
    async index(req, res, next) {
        try{
            const products = await productService.list();
            const categories = await categoryService.list();
            res.render('products/products', {products, categories, currentPage});
         } catch(err) { next(err) };
    }
    // [GET] /products/create-product
    async createProduct(req, res){
        const categories = await categoryService.list();
        res.render('products/create-product', { categories, currentPage })
    }

    // [POST] /products/store
    async storeProduct(req, res, next) {
        try {
            await productService.store(req.body);
            res.redirect('/products');
        } catch (err) { next(err) };
    }

    // [POST] /products/store-category
    async storeCategory(req, res, next) {
        try {
            await categoryService.store(req.body);
            res.redirect('/products');
        } catch (err) { next(err) };
    }

    // [GET] /products/:id/edit
    async edit(req, res, next){
        try{
        product = await productService.findByID(req.params.id);
        res.render('products/edit-product', { product, currentPage });  
        } catch(err) { next(err) }; 
    }

    // [PUT] /products/:id
    async update(req, res, next){
        try{
            await productService.updateOne(req.params.id, req.body);
            res.redirect('/products');
        }catch(err) { next(err) };
    }

    // [DELETE] /products/:id
    async delete(req, res, next){
        try{
            await productService.deleteByID(req.params.id);
            res.redirect('/products');
        } catch(err) { next(err) };
    }
}


module.exports = new ProductsController;

