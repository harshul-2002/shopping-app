const express = require('express');
const userController = require('../../controllers/userController');
const {isLoggedIn } = require('../../middleware/auth');

const router = express.Router();
const catchAsync = require('../../core/catchAsync');
const passport = require('passport');

// BASE PATH USED: /api/v1/users/

// Get the register form
router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync(userController.createUser));

router.get('/login', userController.login);

router.post(
    '/login',
    passport.authenticate(
        'local',
        {
            failureRedirect: '/api/v1/users/login',
            failureFlash: true,
        },
    ),
    (req, res) => {
        req.flash('success', `Welcome back ${req.user.username}`);
        res.redirect('/api/v1/products');
    },
);

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Logged Out Successfully!');
        res.redirect('/api/v1/users/login');
    });
});

// /api/v1/users/cart/products/:productId
router.post('/cart/products/:productId',isLoggedIn, catchAsync(userController.addToCart));

router.get('/cart', isLoggedIn, userController.getUserCart);

module.exports = router;
