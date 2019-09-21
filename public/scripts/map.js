let map;
// Initialize and add the map
function initMap() {
  // The location of Uluru
  var toronto = { lat: 43.7, lng: -79.4 };
  let foodtruck1 = { lat: 43.8, lng: -77.4 };
  // The map, centered at Uluru
  var map = new google.maps.Map(
    document.getElementById('map'), { zoom: 8, center: toronto });
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
  const placeService = new google.maps.places.PlacesService(map);
  const request = {
    query: 'ottawa',
    fields: ['place_id', 'name', 'formatted_address', 'icon', 'geometry']
  }
  placeService.findPlaceFromQuery(request, (results, status) => {
    if (status == google.maps.places.PlacesServiceStatus.OK) {

      results.forEach((item) => {
        // console.log(item)
        // place_id, name, formatted_address, geometry.location, icon

      });

    }
  });
  //searcn input
  let searchInput = document.getElementById('search-input');
  let searchBox = new google.maps.places.SearchBox(searchInput);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(searchInput);
  map.addListener('bounds_changed', function () {
    searchBox.setBounds(map.getBounds());
  });
  //after put in search locations
  let mapMarkers = [];
  searchBox.addListener('places_changed', function () {
    let places  = searchBox.getPlaces();
    if (places.length === 0) {
      return;
    }

    //Clear out the old markers
    mapMarkers.forEach(function (marker) {
      marker.setMap(null);
    });
    mapMarkers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function (place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      mapMarkers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));
 //     mapMarkers.forEach(marker => createMarker(marker));
    })
  });
}

function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    draggable: true
  });

  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
