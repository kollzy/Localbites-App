const express = require('express');
const router = express.Router();
const locationController = require('../controllers/location');
const authController = require('../controllers/auth');

// Routes for Locations
router.get('/locations', locationController.getAllLocations); // Get all locations
router.post('/locations', locationController.createLocation); // Create a new location

// Routes for Google API-based Locations
router.get('/locations/nearby', locationController.getNearbyLocations); // Google Places nearby restaurants
router.get('/locations/details/:id', locationController.getLocationDetails); // Restaurant details

// Routes for Reviews
router.post('/locations/:id/reviews', locationController.addReview); // Add a review to a location

// Routes for Authentication
router.post('/auth/register', authController.register); // Register a new user
router.post('/auth/login', authController.login); // Login a user

module.exports = router;
