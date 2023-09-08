const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    qty: Number,
    imageUrl: String
}, { _id: false });

const userSchema = new mongoose.Schema({
    email: String,
    role: {
        type: String,
        default: 'buyer',
        enum: ['admin', 'seller', 'buyer'],
    },
    cart: [cartItemSchema]
});

userSchema.plugin(passportLocalMongoose);

userSchema.methods.isAuthor = function (productAuthorId) {
    if (this.role == 'seller' && this._id.equals(productAuthorId)) {
        return true;
    }
    return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
