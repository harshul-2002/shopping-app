const express = require('express');
const reviewController = require('../../controllers/reviewController');

const router = express.Router();

router.post('/:id/reviews', reviewController.create);

module.exports = router;
