const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 1,
    },
    comment: {
        type: String,
    },
}, { timestamps: true, versionKey: false });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
