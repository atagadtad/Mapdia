function appendMap() {
  let $map = `
  <div>
  <button id="searchPlace" class="ui button searchPlace">Find place</button>
  </div>`;
  return $map;
}

function appendSearch() {
  //pass map instance with html attribute
  let map = document.getElementById("map").gMap;
  let searchInput = document.getElementById("search-input");
  if (!searchInput) {
    $("#map").append(
      `<input id="search-input" class="controls" type="text" placeholder="Search Box" autocomplete='on'></input>`
    );
    searchInput = document.getElementById("search-input");
    let searchBox = new google.maps.places.SearchBox(searchInput);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(searchInput);
    map.addListener("bounds_changed", function() {
      searchBox.setBounds(map.getBounds());
    });
    //after put in search locations
    let mapMarkers = [];
    searchBox.addListener("places_changed", function() {
      let places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }

      //Clear out the old markers
      mapMarkers.forEach(function(marker) {
        marker.setMap(null);
      });
      mapMarkers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
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
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }
}

function addMarker() {
  let map = document.getElementById("map").gMap;
  //click on map to add marker
  google.maps.event.addListener(map, "click", function(e) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    // populate yor box/field with lat, lng
    alert("Lat=" + lat + "; Lng=" + lng);
  });
}
export { appendMap, appendSearch, addMarker };
