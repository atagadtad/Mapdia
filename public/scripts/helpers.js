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


  //   <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
  //     <div class="card-body">
  //       Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
  //     </div>
  //   </div>
  // </div>
  // }

  $(`#${id}`).click(function () {
    $(`#${id}map`).toggle(this.checked);
    console.log(`let's get some map`);
    $.ajax({
      method: "GET",
      url: "/maps"
    }).done((data) => {
      $(`#${id}map`).append(`<div class="accordion" id="accordionExample">
      <div class="card">
        <div class="card-header" id="headingOne">
          <h2 class="mb-0">
            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              camping map
            </button>
          </h2>
        </div>`)
      for (let map of data.maps) {
  //    const img = 
      $(`#${id}map`).append(`<div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
       <div class="card-body"><p>${map.description}</p>`).append(`<img src="https://cdn.vox-cdn.com/thumbor/1j72cfH6ka3baNiIvbstiHQbnfo=/0x0:5225x3479/920x613/filters:focal(2195x1322:3031x2158):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/54137643/camping_tents.0.jpg" height= "150px" width="150px" > </div>
          </div></div></div></div>`);
      // $(`#${id}map`).append(`<img src="${data.maps.url}" height= "150px" width="150px" >`);
      }
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
