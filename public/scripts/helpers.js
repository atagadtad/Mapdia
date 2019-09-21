function appendMap() {
  let $map = `<div id = "map">
  <script type="text/javascript" src="/scripts/map.js"></script>
  <script async defer
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCZImsQ1Qw68YIf_tHVOoMhs5wz5-F4JHA&libraries=places&callback=initMap">
  </script>
  </div>`;
  return $map;
}

function appendSearch() {
  return `<input id="search-input" class="controls" type="text" placeholder="Search Box"></input>`;
}
export { appendMap, appendSearch };
