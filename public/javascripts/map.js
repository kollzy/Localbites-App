
function initMap() {
    const maps = document.querySelectorAll('.map');
    
    maps.forEach((mapElement) => {
      const lat = parseFloat(mapElement.dataset.lat);
      const lon = parseFloat(mapElement.dataset.lon);
  
      // Initialize the map for each location
      const map = new google.maps.Map(mapElement, {
        center: { lat, lng: lon },
        zoom: 14
      });
  
      new google.maps.Marker({
        position: { lat, lng: lon },
        map: map,
        title: 'Restaurant Location'
      });
    });
  }
  