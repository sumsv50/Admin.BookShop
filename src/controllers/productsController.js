const Products = require('../models/Products');
const { mongoosesToObject, mongooseToObject } = require('../util/mongoose');
const {bodyToMongoose} = require('../util/bodyToMongoose');

class ProductsController {
    index(req, res, next) {
        Products.find({})
            .then(products =>
                {res.render('products/products', { products: mongoosesToObject(products)
                })
            })
            .catch(next);
    }
    createProduct(req, res){
        res.render('products/create-product')
    }

    //[POST] products/store
    storeProduct(req, res){
        const formData = bodyToMongoose(req.body);

       const product = new Products(formData);
       product.save()
       .then(()=>{
        res.redirect('/products')
       })
    }

    // [GET] /products/:id/edit
    edit(req, res, next){
        Products.findById(req.params.id)
            .then((product) => res.render('products/edit-product', {
                product: mongooseToObject(product)
            }))
            .catch(next)
            
    }

    // [PUT] /products/:id
    update(req, res, next){
         Products.updateOne({_id: req.params.id}, bodyToMongoose(req.body))
            .then(()=> res.redirect('/products'))
            .catch(next)
    }

    // [DELETE] /products/:id
    delete(req, res, next){
        Products.deleteOne({_id: req.params.id})
            .then(()=>res.redirect('/products'))
            .catch(next)
    }
}


module.exports = new ProductsController;

