const axios = require('axios');
const Location = require('../models/locations');
const request = require('request');  



// Fetch nearby locations using Google Places API
exports.getNearbyLocations = async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
      {
        params: {
          location: `${lat},${lon}`,
          radius: 5000,
          type: 'restaurant',
          key: GOOGLE_API_KEY,
        },
      }
    );

    const locations = response.data.results.slice(0, 10).map((place) => ({
      id: place.place_id,
      name: place.name,
      address: place.vicinity,
      rating: place.rating || 'No rating',
      coords: place.geometry.location,
    }));

    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching nearby locations', error });
  }
};

// Fetch location details using Google Places API
exports.getLocationDetails = async (req, res) => {
  const placeId = req.params.id;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json`,
      {
        params: {
          place_id: placeId,
          key: GOOGLE_API_KEY,
        },
      }
    );

    const details = response.data.result;
    const locationInfo = {
      name: details.name,
      address: details.formatted_address,
      phone: details.formatted_phone_number,
      rating: details.rating || 'No rating',
      reviews: details.reviews || [],
      openingTimes: details.opening_hours?.weekday_text || ['No opening times available'],
      coords: details.geometry.location,
    };

    res.status(200).json(locationInfo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching location details', error });
  }
};

// GET request to fetch all locations
exports.getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find(); // Fetch all locations from the DB
    res.status(200).json(locations); // Send the locations as a JSON response
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ message: 'Error fetching locations', error });
  }
};

// POST request to create a new location
exports.createLocation = async (req, res) => {
  try {
    // Create a new location instance with the data from the request body
    const newLocation = new Location(req.body);

    // Save the new location to the database
    await newLocation.save();

    // Respond with the newly created location
    res.status(201).json(newLocation);
  } catch (error) {
    console.error('Error creating location:', error);
    res.status(500).json({ message: 'Error creating location', error });
  }
};

exports.getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id).exec();
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    // Ensure each review has a valid Date
    location.reviews.forEach(review => {
      review.createdOn = new Date(review.createdOn); // Parse it as a Date object if it's a string
    });

    res.status(200).json(location); // Send location data with parsed review dates
  } catch (error) {
    console.error('Error fetching location by ID:', error);
    res.status(500).json({ message: 'Error fetching location', error });
  }
};
exports.addReview = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    const newReview = {
      author: req.body.author,
      rating: parseInt(req.body.rating, 10),
      reviewText: req.body.reviewText,
      createdOn: new Date()
    };

    location.reviews.push(newReview);
    await location.save();

    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Error adding review', error });
  }
};
