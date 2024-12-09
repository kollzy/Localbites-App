const express = require('express'); 
const router = express.Router();
const locationsController = require('../controllers/locations'); // Adjust path if needed
const authRouter = require('./auth'); 

// Homepage route
router.get('/', locationsController.homelist); // Displays location list on homepage

// Individual location route (for MongoDB-stored locations)
router.get('/location/:id', locationsController.locationInfo);

// Google API Restaurant Details
router.get('/restaurant/:id', locationsController.restaurantDetails);

// Routes for login and register
router.use('/auth', authRouter);

module.exports = router;
