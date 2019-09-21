export function appendMap() {
  let $map = `<div id = "map">
  <script type="text/javascript" src="/scripts/map.js"></script>
  <script async defer
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCZImsQ1Qw68YIf_tHVOoMhs5wz5-F4JHA&callback=initMap">
  </script>
  </div>`;
  return $map;
}
