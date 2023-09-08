const userRepo = require('../repositories/userRepo');
const productRepo = require('../repositories/productRepo');

const createUser = async (user, password) => await userRepo.createUser(user, password);

const addToCart = async(user, productId) => {
    const product = await productRepo.findById(productId);
    const cartItem = {
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        qty: 1
    };
    user.cart.push(cartItem);
    await userRepo.save(user);
}

module.exports = {
    createUser,
    addToCart
};
