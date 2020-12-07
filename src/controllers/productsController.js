const formidable = require('formidable');
const fs = require('fs'); 
const fsPromise = fs.promises;

const productService = require('../models/modelServices/ProductService');
const categoryService = require('../models/modelServices/categoryService');


const currentTab= 'product';
const ITEM_PER_PAGE = 10;

class ProductsController {

    // [GET] /products
    async index(req, res, next) {
        try{
            const page = req.query.page || 1;
            const paginate = await productService.list(page, ITEM_PER_PAGE);
            const categories = await categoryService.list();
            res.render('products/products', {
                products: paginate.docs,
                categories,
                currentTab,
                currentPage: paginate.page,
                hasPrevPage: paginate.hasPrevPage,
                hasNextPage: paginate.hasNextPage,
                totalPages: paginate.totalPages,

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
                if (err) {
                    next(err);
                    return;
                }

                const img = files.img;
                if(img && img.size >0) {
                    const fileName = img.path.split('\\').pop() + '.' + img.name.split('.').pop();
                    await fsPromise.copyFile(img.path, __dirname + '\\..\\public\\img\\books\\' + fileName);
                    await fsPromise.rm(img.path);
                    fields.img = process.env.CDN_IMG + '/img/books/' + fileName;
                }
                await productService.store(fields);
                // Increase number of books of Category
                await categoryService.increaseNum(fields.categoryID);
                res.redirect('/products');

                console.log(files);
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

