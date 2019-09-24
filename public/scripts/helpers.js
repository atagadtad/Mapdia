function appendMap() {
  let $map = `
  <div>
  <button id = 'searchPlace'>Find place</button>
  </div>
`;
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
    map.addListener("bounds_changed", function () {
      searchBox.setBounds(map.getBounds());
    });
    //after put in search locations
    let mapMarkers = [];
    searchBox.addListener("places_changed", function () {
      let places = searchBox.getPlaces();
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
function checkMapCollections(id) {

  // ($(`#${id}map`).css('display') == 'none') {

  // }

  $(`#${id}`).click(function () {
    $(`#${id}map`).toggle(this.checked);
    console.log(`let's get some map`);
    $.ajax({
      method: "GET",
      url: "/maps"
    }).done((data) => {
      console.log(data.maps.url);
  //    const img = 
      $(`#${id}map`).append(`<p>${data.maps.description}</p>`).append(`<img src="https://cdn.vox-cdn.com/thumbor/1j72cfH6ka3baNiIvbstiHQbnfo=/0x0:5225x3479/920x613/filters:focal(2195x1322:3031x2158):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/54137643/camping_tents.0.jpg" height= "150px" width="150px" >`);
      // $(`#${id}map`).append(`<img src="${data.maps.url}" height= "150px" width="150px" >`);
    });
  });
  //   if ($('.new-tweet').css('display') == 'none') {
  //     $('.new-tweet').slideDown('slow', function() {
  //         $('textArea').focus();
  //     });
  // } else {
  //     $('.new-tweet').slideUp('slow');
  // }
}
function addMarker() {
  let map = document.getElementById("map").gMap;
  //click on map to add marker
  google.maps.event.addListener(map, "click", function (e) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    // populate yor box/field with lat, lng
    alert("Lat=" + lat + "; Lng=" + lng);
  });
}
export { appendMap, appendSearch, addMarker, checkMapCollections };
