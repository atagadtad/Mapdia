let map;
let markers = [];
let pinMap = [];
// Initialize and add the map
function initMap() {
  // The location of Uluru
  var toronto = { lat: 43.7, lng: -79.4 };
  // The map, centered at Uluru
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: toronto
  });
  var marker = new google.maps.Marker({
    position: toronto,
    draggable: true
  });
  let marker1 = new google.maps.Marker({
    position: { lat: 43.9, lng: -79.4 },
    draggable: true
  });
  // map1.push(marker);
  // map1.push(marker1);
  // map1.forEach(item => item.setMap(map));
  const placeService = new google.maps.places.PlacesService(map);
  const request = {
    query: "ottawa",
    fields: ["place_id", "name", "formatted_address", "icon", "geometry"]
  };
  placeService.findPlaceFromQuery(request, (results, status) => {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      results.forEach(item => {
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
    markers.push({ lat: marker.position.lat(), lng: marker.position.lng() });
    marker.setMap(map);
    console.log(marker.position);
    //    const contentString = setContentString(markers.length);
    const contentString = setContentString(marker);
    var infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, "click", function () {
      infowindow.setContent(contentString);
      infowindow.open(map, this);

    });
    google.maps.event.addListener(marker, "rightclick", function () {
      marker.setMap(null);
      markers.push(marker);
      console.log("APPLES")

    });
  });
  let divMap = document.getElementById("map");
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
  google.maps.event.addListener(marker, "click", function () {
    infowindow.setContent(contentString);
    infowindow.open(map, this);
  });
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
            </div>`;
  return contentString;
}


$(() => {
  console.log('loaded');

  //ajax request to GET
  $("#map1").click(() => {
    $.ajax({
      url: '/pins',
      success: (data) => {
        let lat = data.data[0].latitude;
        let lng = data.data[0].longitude;
        console.log(lat, lng);
        let marker1 = new google.maps.Marker({
          position: { lat: lat, lng: lng },
          draggable: true
        });
        pinMap.push(marker1);
        pinMap.forEach(item => item.setMap(map));
        map.setCenter(marker1.getPosition());
      }
    });
  })


  $("#map_submission").on("submit", evt => {
    //  var dataString = JSON.parse(markers);
    evt.preventDefault();
    //ajax request to /maps with markers
    $.ajax({
      url: '/pinsCollection',
      method: 'POST',
      data: { data: markers },
      dataType: "json",
      success: function (status) {
        console.log(status);
        // markers=[];
      }
    })
  })
});
