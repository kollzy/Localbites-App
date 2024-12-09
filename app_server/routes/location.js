const express = require('express');
const router = express.Router();
const locationsController = require('../controllers/locations');

// Home List
router.get('/', locationsController.homelist);

// Location Info: MongoDB-based location details
router.get('/:id', locationsController.locationInfo);

// Search and display results
router.get('/search', (req, res) => {
  res.render('search', { places: [], query: '', errorMessage: null });
});
router.post('/search', locationsController.performSearch);

// Restaurant Info: Details for searched restaurants (from Google Places)
router.get('/restaurant/:id', locationsController.restaurantDetails);

// Submit review for both MongoDB-based and Google Places-based restaurants
router.post('/:id/review', locationsController.submitReview);

module.exports = router;
