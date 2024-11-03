const homelist = function(req, res){
  res.render('locations-list', {
  title: 'LocalBites - find a place to eat',
  pageHeader: {
  title: 'LocalBites',
  strapline: 'Find places eat near to you!'
  },
  locations: [{
  
  name: 'Dinanos',
  address: 'Tralee,County Kerry, Ireland',
  rating: 4,
  facilities: [' drinks', 'Food', 'free wifi'],
  distance: '200m'
  },{
    name: 'Burger King',
    address: '125 High Street, Reading, RG6 112',
    rating: 2,
    imageUrl: '/images/burger-king.jpg',
    facilities: ['C drinks', 'Food'],
    distance: '230m'
  },{
    name: 'Vegan Sushi',
    address: '125 High Street, Reading, RG6 102',
    rating: 2,
    facilities: ['drinks', 'Food'],
    distance: '230m',
   }, {
  name: 'Burger Queen',
  address: '125 High Street, Reading, RG6 1P9',
  rating: 2,
  facilities: ['Food', 'drinks'],
  distance: '250m'
  }]
  });
  };

/* GET 'Location info' page */
const locationInfo = function(req, res){
  res.render('location-info', { title: 'Location info' });
};

/* GET 'Add review' page */
const addReview = function(req, res){
  res.render('location-review-form', { title: 'Add review' });
};

module.exports = {
  homelist,
  locationInfo,
  addReview
};