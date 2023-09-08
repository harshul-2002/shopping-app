const reviewRepo = require('../repositories/reviewRepo');
const productRepo = require('../repositories/productRepo');

const create = async (productId, review) => {
    // find the product with the id
    const product = await productRepo.findById(productId);
    // save the incoming review
    const newReview = await reviewRepo.save(review);
    product.reviews.push(newReview);
    await productRepo.save(product);
    return product;
};

module.exports = {
    create,
};
