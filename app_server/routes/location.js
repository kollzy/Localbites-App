const express = require('express');
const router = express.Router();
const locationsController = require('../controllers/locations'); // Ensure the path is correct

// Ensure that `locationsController.getAllLocations` and `locationsController.getLocationById` are defined
router.get('/', locationsController.homelist);
router.get('/:id', locationsController.locationInfo);

module.exports = router;
