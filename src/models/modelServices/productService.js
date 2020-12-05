const Products = require('../Products');
const {bodyToMongoose} = require('../../util/bodyToMongoose');
module.exports.list = async () => {
    const products = await Products.find({}).lean();
    return products;
}

module.exports.store = async (reqBody) => {
    const formData = bodyToMongoose(reqBody);
    const product = new Products(formData);
    await product.save();
}

module.exports.findByID = async (productID) => {
    product = await Products.findById(productID).lean();
    return product;   
}

module.exports.updateOne = async (id, reqBody) => {
    await Products.updateOne({_id: id}, bodyToMongoose(reqBody));
}

module.exports.deleteByID = async (id) => {
    await Products.deleteOne({_id: id});
}