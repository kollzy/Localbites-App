require('dotenv').config();
const locationsController = require('./app_server/controllers/locations');
const express = require('express');
require('./app_api/models/locations'); // Ensure your models are loaded properly
const path = require('path');
const request = require('request'); 
const passport = require('passport');



const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // Added for reliable session storage

// Routes
const indexRouter = require('./app_server/routes/index');
const locationRouter = require('./app_server/routes/location');
const authRouter = require('./app_server/routes/auth');
const cors = require('cors');


// API Routes
const apiRouter = require('./app_api/routes/index');
const connectDB = require('./app_api/models/db');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));



app.use(cors()); // Allow requests from any origin

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/locations/search', locationsController.performSearch); // For GET requests
app.post('/locations/search', locationsController.performSearch); // For POST requests


// Connect to the database
connectDB()
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.error('Database connection failed:', err));

// Session middleware setup
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI, // MongoDB connection string
        collectionName: 'sessions'
    }),
    cookie: { secure: false } 
}));

// Logging and static files middleware
app.use(logger('dev'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Set up view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'app_server', 'views'));

// Routes
app.use('/api', apiRouter); // API routes
app.use('/', indexRouter); // Homepage routes
app.use('/locations', locationRouter); // Location views
app.use('/auth', authRouter); // Authentication routes

// Error handling middleware
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});




app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
