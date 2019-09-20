let map;
// Initialize and add the map
function initMap() {
  // The location of Uluru
  var toronto = { lat: 43.7, lng: -79.4 };
  let foodtruck1 = { lat: 43.8, lng: -77.4 };
  // The map, centered at Uluru
  var map = new google.maps.Map(
    document.getElementById('map'), { zoom: 8, center: toronto });
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({
    position: toronto,
    map: map,
    draggable: true
  });
  let foodtruck = new google.maps.Marker({
    position: foodtruck1,
    map: map,
    draggable: true
  });
}
