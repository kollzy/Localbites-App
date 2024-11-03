const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlOthers = require('../controllers/others');
const ctrlAuth = require('../controllers/auth'); 


router.get('/', ctrlLocations.homelist);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);


router.get('/about', ctrlOthers.about);


router.get('/login', ctrlAuth.renderLogin); // Route for login page
router.post('/login', ctrlAuth.handleLogin); // Route for login form submission
router.get('/register', ctrlAuth.renderRegister); // Route for registration page
router.post('/register', ctrlAuth.handleRegister); // Route for registration form submission

module.exports = router;
