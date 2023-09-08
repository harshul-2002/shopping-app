const Review = require('../models/Review');

const save = (review) => {
    const newReview = new Review(review);
    return newReview.save();
};

module.exports = {
    save,
};
