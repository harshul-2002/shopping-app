const productRepo = require('../repositories/productRepo');

const PRODUCT_AUTHOR_ROLES = ['seller', 'admin'];

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'Please login to continue');
        return res.redirect('/api/v1/users/login');
    }
    return next();
};

const isAdminOrSeller = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'Please login to continue');
        return res.redirect('/api/v1/users/login');
    }
    if (!PRODUCT_AUTHOR_ROLES.includes(req.user.role)) {
        req.flash('error', 'You dont have permission to do that.');
        return res.redirect('/api/v1/users/login');
    }
    return next();
};

const isProductAuthor = async (req, res, next) => {
    const { id: productId } = req.params;
    if (!req.isAuthenticated()) {
        req.flash('error', 'Please login to continue');
        return res.redirect('/api/v1/users/login');
    }
    if (!PRODUCT_AUTHOR_ROLES.includes(req.user.role)) {
        req.flash('error', 'You dont have permission to do that.');
        return res.redirect('/api/v1/users/login');
    }
    const product = await productRepo.findById(productId);

    if (!(product.author && product.author.equals(req.user._id))) {
        req.flash('error', 'You dont have permission to do that.');
        return res.redirect('/api/v1/users/login');
    }
    return next();
};

module.exports = {
    isAdminOrSeller,
    isLoggedIn,
    isProductAuthor,
};
