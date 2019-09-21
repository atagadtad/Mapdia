function appendMap() {
  let $map = `<div id = "map">
  <script type="text/javascript" src="/scripts/map.js"></script>
  <script async defer
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCZImsQ1Qw68YIf_tHVOoMhs5wz5-F4JHA&libraries=places&callback=initMap">
  </script>
  </div>
  <div>
  <button id = 'searchPlace'>Find place</button>
  </div>`;
  return $map;
}

function appendSearch() {
  console.log(' i am appending');
  let map = document.getElementById('map').gMap;
  console.log(map);
 // return `<input id="search-input" class="controls" type="text" placeholder="Search Box"></input>`;
 // let map = document.getElementById('map');

  $("body").append(`<input id="search-input" class="controls" type="text" placeholder="Search Box" autocomplete='on'></input>`);
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
export { appendMap, appendSearch };
