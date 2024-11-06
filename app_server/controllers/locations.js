const homelist = (req, res) => {
  res.render('locations-list', {
      title: 'LocalBites - find a place to eat',
      pageHeader: { title: 'LocalBites', strapline: 'Find places to eat near to you!' },
      locations: [
          { name: 'Dinanos', address: 'Tralee, County Kerry, Ireland', rating: 4, facilities: ['drinks', 'Food', 'free wifi'], distance: '200m' },
          { name: 'Burger King', address: '125 High Street, Reading, RG6 112', rating: 2, facilities: ['drinks', 'Food'], distance: '230m' },
          { name: 'Vegan Sushi', address: '125 High Street, Reading, RG6 102', rating: 2, facilities: ['drinks', 'Food'], distance: '230m' },
          { name: 'Burger Queen', address: '125 High Street, Reading, RG6 1P9', rating: 2, facilities: ['Food', 'drinks'], distance: '250m' }
      ]
  });
};

const locationInfo = (req, res) => {
  res.render('location-info', { title: 'Location info' });
};

module.exports = {
  homelist,
  locationInfo
};
