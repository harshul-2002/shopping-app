const productService = require('../services/productService');
const Logger = require('../core/Logger');

const getAllProducts = async (req, res) => {
    const products = await productService.getAllProducts();
    res.render('products/index', { products });
};

const create = async (req, res) => {
    Logger.info('Entry in create product');
    const product = {
        name: req.body.name,
        price: req.body.price,
        desc: req.body.desc,
        imageUrl: req.body.imageUrl,
        quantity: req.body.quantity,
        rating: req.body.rating,
        author: req.user._id,
    };

    await productService.create(product);
    res.redirect('/api/v1/products');
};

const showNewForm = (req, res) => {
    res.render('products/showNewForm');
};
const findById = async (req, res) => {
    Logger.info('Entry in show product');
    const { id } = req.params;
    const product = await productService.findById(id);
    res.render('products/show', { product });
};

const deleteProduct = async (req, res) => {
    Logger.info('Entry in delete product');
    const { id } = req.params;
    await productService.deleteProduct(id);
    req.flash('success', 'Delete the product successfully');
    res.redirect('/api/v1/products');
};

module.exports = {
    getAllProducts,
    create,
    findById,
    showNewForm,
    deleteProduct,
};
