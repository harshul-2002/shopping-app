const productRepo = require('../repositories/productRepo');
const { BadRequestError } = require('../core/ApiError');

const getAllProducts = async () => productRepo.getAllProducts();

const create = async (product) => productRepo.save(product);

const findById = async (id) => {
    const product = await productRepo.findByIdWithReviews(id);
    if (!product) {
        throw new BadRequestError('Product not found!');
    }
    return product;
};

const deleteProduct = async (id) => await productRepo.deleteProduct(id);

module.exports = {
    create,
    getAllProducts,
    findById,
    deleteProduct,
};
