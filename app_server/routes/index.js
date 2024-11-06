const express = require('express');
const router = express.Router();
const locationsController = require('../controllers/locations'); // Adjust path if needed
const authRouter = require('./auth'); // Assuming `auth.js` exists for login/register routes

// Homepage route
router.get('/', locationsController.homelist); // Displays location list on homepage

// Individual location route (if applicable)
router.get('/location/:id', locationsController.locationInfo); 

// Routes for login and register
router.use('/auth', authRouter);

module.exports = router;
