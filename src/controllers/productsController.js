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
            // Increase number of books of Category
            await categoryService.increaseNum(req.body.categoryID);
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
            const categories = await categoryService.list();
            const product = await productService.findByID(req.params.id);
            product.categoryID = product.categoryID.toString();
            res.render('products/edit-product', { product, categories, currentPage });  
        } catch(err) { next(err) }; 
    }

    // [PUT] /products/:id
    async update(req, res, next){
        try{
            const oldProduct = await productService.findByID(req.params.id);
            const categoryID_old = oldProduct.categoryID;

            await productService.updateOne(req.params.id, req.body);
            if(categoryID_old != req.body.categoryID){
                await categoryService.decreaseNum(categoryID_old);
                await categoryService.increaseNum(req.body.categoryID);
            }

            res.redirect('/products');
        }catch(err) { next(err) };
    }

    // [DELETE] /products/:id/:categoryID
    async delete(req, res, next){
        try{
            await productService.deleteByID(req.params.id);
            await categoryService.decreaseNum(req.params.categoryID);
            res.redirect('/products');
        } catch(err) { next(err) };
    }
}


module.exports = new ProductsController;

