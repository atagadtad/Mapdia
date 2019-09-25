function insertImage(src) {
  return `<img src="${src}">`;
};
function insertAnchor(mapId, src) {
  let imgtag = insertImage(src);
  return `<a href="/showmap/${mapId}"><img src="${src}"></a>`
}
$(function($) {

  $.ajax({
    url: '/maps',
    success: (data) => {
      for (let map of data.maps){
      console.log(data.maps[0].url);
      $('.mapsContainer').append(insertAnchor(map.id, map.url));
    }}
  });
  
});