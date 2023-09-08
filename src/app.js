const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const { secret } = require('./configs');
const { healthcheckRoutes, v1Routes } = require('./routes');
const User = require('./models/User');
const MongoStore = require('connect-mongo');
const { dbUrl } = require('./configs/database');

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

const store = MongoStore.create({
    mongoUrl: dbUrl,
    ttl: 14 * 24 * 60 * 60,
    autoRemove: 'native',
    touchAfter: 24 * 3600 // time period in seconds
})

const sessionConfig = {
    store: store,
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        // secure: true
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
};

app.use(session(sessionConfig));
app.use(flash());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 5000 }));

// Passport configurations with express
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Passport middleware should be used after session middleware for persistant login
app.use(passport.initialize());
app.use(passport.session());

// By using res.locals we can pass the variable globally to all the views(templates)
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
});

app.get('/', (req, res) => {
    res.render('home');
});

app.use(healthcheckRoutes);
app.use('/api/v1', v1Routes);

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong. Try again after sometime' } = err;
    res.status(status).render('error', { message });
});

module.exports = app;
