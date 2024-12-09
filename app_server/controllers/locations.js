const axios = require('axios');
const Review = require('../../app_api/models/reviews'); 
const Location = require('../../app_api/models/locations');
const apiOptions = {
  server: process.env.NODE_ENV === 'production' ? 'https://your-production-url.com' : 'https://localhost:3000',
};


const performSearch = (req, res) => {
  const query = req.body.query;
  const location = req.body.location;

  if (!query) {
    return res.render('search', { errorMessage: 'Please enter a restaurant name', places: [], query, location });
  }

  const googlePlacesApiKey = process.env.GOOGLE_MAPS_API_KEY;
  const googlePlacesUrl = location
    ? `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)} in ${encodeURIComponent(location)}&key=${googlePlacesApiKey}`
    : `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${googlePlacesApiKey}`;

  axios.get(googlePlacesUrl)
    .then((response) => {
      const places = response.data.results || [];
      const formattedPlaces = places.map((place) => ({
        id: place.place_id,
        name: place.name,
        vicinity: place.vicinity,
        rating: place.rating || 'No rating available',
        openingHours: place.opening_hours ? (place.opening_hours.open_now ? 'Open Now' : 'Closed') : 'No data',
        reviews: place.user_ratings_total || 0,
        lat: place.geometry.location.lat,
        lon: place.geometry.location.lng
      }));

      res.render('search', {
        places: formattedPlaces,
        query,
        location,
        errorMessage: places.length === 0 ? 'No places found for your search.' : null
      });
    })
    .catch((error) => {
      console.error('Error fetching Google Places data:', error);
      return res.render('search', { errorMessage: 'Error fetching results', places: [], query, location });
    });
};

const homelist = async (req, res) => {
  try {
    console.log('Fetching locations for homepage'); // Debugging

    // Fetch locations from your MongoDB database
    const locations = await Location.find({}).limit(7); 

    
    const formattedLocations = locations.map((loc) => ({
      id: loc._id,
      name: loc.name,
      address: loc.address || 'No address available',
      rating: loc.rating || 'No rating available',
      openingHours: loc.openingHours || 'No data',
      reviews: loc.reviews ? loc.reviews.length : 0,
    }));

    console.log('Locations fetched successfully:', formattedLocations);

    
    _renderHomepage(req, res, formattedLocations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).render('error', { message: 'Error loading locations' });
  }
};

// Helper function to render the homepage
const _renderHomepage = (req, res, locations) => {
  res.render('locations-list', {
    title: 'LocalBites - Find a Place to Eat',
    pageHeader: {
      title: 'LocalBites',
      strapline: 'Find places to eat near you!',
    },
    locations,
  });
};

const locationInfo = async (req, res) => {
  const locationId = req.params.id;

  try {
    const location = await Location.findById(locationId);
    if (!location) {
      return res.status(404).render('error', { message: 'Location not found' });
    }

    res.render('location-info', {
      title: location.name,
      location: {
        name: location.name,
        address: location.address,
        rating: location.rating,
        openingHours: location.openingHours || 'No data available',
        reviews: location.reviews ? location.reviews.length : 0,
        lat: location.lat,
        lon: location.lon,
        id: location._id,
      },
      apiKey: process.env.GOOGLE_MAPS_API_KEY,
    });
  } catch (err) {
    console.error('Error fetching location:', err);
    res.status(500).render('error', { message: 'Error fetching location' });
  }
};

const restaurantDetails = async (req, res) => {
  const placeId = req.params.id;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

  try {
    const { data } = await axios.get(url);
    const place = data.result;

    res.render('restaurant-info', {
      title: place.name,
      location: {
        name: place.name,
        address: place.formatted_address || 'No address available',
        rating: place.rating || 'No rating available',
        openingHours: place.opening_hours
          ? place.opening_hours.weekday_text.join(', ')
          : 'No data available',
        reviews: place.user_ratings_total || 0,
        userReviews: place.reviews ? place.reviews.slice(0, 5) : [],
        lat: place.geometry.location.lat,
        lon: place.geometry.location.lng,
      },
      apiKey,
    });
  } catch (err) {
    console.error('Error fetching restaurant details:', err);
    res.status(500).render('error', { message: 'Error loading restaurant details.' });
  }
};const submitReview = async (req, res) => {
  const locationId = req.params.id;
  const { author, rating, reviewText } = req.body;

  if (!author || !rating || !reviewText) {
    return res.status(400).render('error', { message: 'All fields are required' });
  }

  try {
    const newReview = { author, rating: parseInt(rating, 10), text: reviewText };
    
   
    if (locationId.startsWith('mongo_')) {
      await Location.findByIdAndUpdate(locationId.replace('mongo_', ''), {
        $push: { userReviews: newReview }
      });
    } else {
      await addGoogleReview(locationId, newReview); 
    }

    
    const location = await Location.findById(locationId.replace('mongo_', ''));
    res.render('restaurantinfo', { location, successMessage: 'Your review has been successfully saved!' });

  } catch (error) {
    res.status(500).render('error', { message: 'Unable to save the review. Please try again.' });
  }
};


module.exports = {
  performSearch,
  locationInfo,
  restaurantDetails,
  submitReview,
  homelist
};
