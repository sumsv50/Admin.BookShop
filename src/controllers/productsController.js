const Products = require('../models/Products');
const { mongoosesToObject } = require('../util/mongoose');

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
        const formData = req.body;
        const detail = new Object;
        
        detail.isbn = req.body.isbn;
        detail.publisher = req.body.publisher;
        detail.publication_date = req.body.publication_date;
        detail.pages = req.body.pages;
        detail.sales_rank = req.body.sales_rank;
        detail.product_dimensions = req.body.product_dimensions

        formData.detail = detail;

       const product = new Products(formData);
       product.save()
       .then(()=>{
        res.redirect('/products')
       })
    }
}


module.exports = new ProductsController;