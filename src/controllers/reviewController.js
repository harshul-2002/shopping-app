const reviewService = require('../services/reviewService');

const create = async (req, res) => {
    const { id: productId } = req.params;
    const review = {
        rating: req.body.rating,
        comment: req.body.comment,
    };

    await reviewService.create(productId, review);
    req.flash('success', 'Added your review successfully');
    res.redirect(`/api/v1/products/${productId}`);
};

module.exports = {
    create,
};
