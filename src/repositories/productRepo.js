const Product = require('../models/Product');

const getAllProducts = () => Product.find({});

const save = (product) => {
    const newProduct = new Product(product);
    return newProduct.save();
};

const findById = (id) => Product.findById(id);

const findByIdWithReviews = (id) => Product.findById(id)
    .populate('reviews');

const deleteProduct = (id) => Product.findByIdAndDelete(id);

module.exports = {
    save,
    getAllProducts,
    findById,
    findByIdWithReviews,
    deleteProduct,
};
