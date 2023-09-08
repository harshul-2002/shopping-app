const express = require('express');

const router = express.Router();
const productRoutes = require('./productRoutes');
const reviewRoutes = require('./reviewRoutes');
const userRoutes = require('./userRoutes');

router.use('/products', productRoutes);
router.use('/products', reviewRoutes);
router.use('/users', userRoutes);

module.exports = router;
