let map;
let markers = [];
let map1 = [];
// Initialize and add the map
function initMap() {
  // The location of Uluru
  var toronto = { lat: 43.7, lng: -79.4 };
  // The map, centered at Uluru
  map = new google.maps.Map(
    document.getElementById('map'), { zoom: 8, center: toronto });
  var marker = new google.maps.Marker({
    position: toronto,
    draggable: true
  });
  let marker1 = new google.maps.Marker({
    position: { lat: 43.9, lng: -79.4 },
    draggable: true
  });
  map1.push(marker);
  map1.push(marker1);
  map1.forEach(item => item.setMap(map));
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
  //   google.maps.event.addListener(map, "rightclick", function(event) {
  //     var lat = event.latLng.lat();
  //     var lng = event.latLng.lng();
  //     // populate yor box/field with lat, lng
  //     alert("Lat=" + lat + "; Lng=" + lng);
  // });
  google.maps.event.addListener(map, "click", function (event) {
    let marker = new google.maps.Marker({
      id: markers.length,
      position: event["latLng"],
      label: markers.length.toString(),
      // title: "Hello World!"
      draggable: true
    });
    markers.push(marker)
    marker.setMap(map);
    //    const contentString = setContentString(markers.length);
    const contentString = setContentString(marker);
    var infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', function () {
      infowindow.setContent(contentString);
      infowindow.open(map, this);
    });
    google.maps.event.addListener(marker, 'rightclick', function () {
      marker.setMap(null);
      markers.push(marker);
    });


  });
  let divMap = document.getElementById('map');
  divMap.gMap = map;

}

function createMarker() {
  var marker = new google.maps.Marker({
    id: markers.length,
    position: event["latLng"],
    label: markers.length.toString(),
    // title: "Hello World!"
    draggable: true
  });
  var infowindow = new google.maps.InfoWindow();
  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(contentString);
    infowindow.open(map, this);
  })
  return marker;
}

function setContentString(marker) {
  const contentString = `<div id=${marker}>
            <div id="siteNotice">
            </div>
            <h1 id="firstHeading" class="firstHeading">${marker.position}</h1>
            <div id="bodyContent">
            <p><b></b>
            </p>
            </div>
            </div>`
  return contentString;
}


<<<<<<< HEAD
$( () => {
  console.log('loaded');

  //ajax request to GET
  $.ajax({ 
    url: '/pins',
    success: (data) => {
      console.log(data)
    }
  });

  $('#map_submission').on('submit', evt => {
    evt.preventDefault();
    console.log(markers)
    //ajax request to /maps with markers
  })
});
=======
>>>>>>> e868eeed3995a8ac78e432b2500ab9952ba1f11e
