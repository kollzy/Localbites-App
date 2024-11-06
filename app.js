// app.js
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session'); 
const indexRouter = require('./app_server/routes/index');
const locationRouter = require('./app_server/routes/location');
const authRouter = require('./app_server/routes/auth');
const connectDB = require('./app_server/models/db'); 

const app = express();

// Connect to the database
connectDB();

// Set up view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'app_server', 'views'));

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware setup
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
}));

// Routes
app.use('/', indexRouter);
app.use('/locations', locationRouter);
app.use('/auth', authRouter);

// Error handling middleware
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
