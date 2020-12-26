const mongoose = require('mongoose')
const formidable = require('formidable');
const fs = require('fs'); 
const fsPromise = fs.promises;

const productService = require('../models/modelServices/productService');
const categoryService = require('../models/modelServices/categoryService');
const cloudinary = require('../config/Cloudinary/index');

const currentTab= 'product';
const ITEM_PER_PAGE = 10;

class ProductsController {

    // [GET] /products
    async index(req, res, next) {
        try{
            const page = req.query.page || 1;
            const category = req.query.category;
            const key = req.query.key;

            const query = {}; 
            const numOfBooks = await productService.countBooks();
            
            if(key) {
                query.name = new RegExp(key,'i');
            }
            if(category) {
                query.categoryID = category;
            };


            const paginate = await productService.list(query, page, ITEM_PER_PAGE);
            const categories = await categoryService.list();
            res.render('products/products', {
                products: paginate.docs,
                numOfBooks,
                categories,
                currentTab,
                currentPage: paginate.page,
                hasPrevPage: paginate.hasPrevPage,
                hasNextPage: paginate.hasNextPage,
                totalPages: paginate.totalPages,
                currentCategory: category,
                key,
            });
         } catch(err) { next(err) };
    }
    // [GET] /products/create-product
    async createProduct(req, res){
        const categories = await categoryService.list();
        res.render('products/create-product', { categories, currentTab })
    }

    // [POST] /products/store
    async storeProduct(req, res, next) {
        try {
            const form = formidable({ multiples: true });

            form.parse(req, async (err, fields, files) => {
                try{
                    if (err) {
                        next(err);
                        return;
                    }

                    const img = files.img;
                    if(img && img.size >0) {
                    
                        const result = await cloudinary.uploadToCloudinary(img.path, 'books');
                        fields.img = result.url;
                    
                    }
                    await productService.store(fields);
                    // Increase number of books of Category
                    await categoryService.increaseNum(mongoose.Types.ObjectId(fields.categoryID));
                    res.redirect('/products');
                }catch(err){ next(err) };
            });
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
            res.render('products/edit-product', { product, categories, currentTab });  
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

