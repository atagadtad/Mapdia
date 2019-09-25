function insertImage(src) {
  return `<img src="${src}">`;
};
function insertAnchor(mapId, src) {
  let imgtag = insertImage(src);
  return `<a class ='anchormap' href="/showmap/${mapId}"><img src="${src}"></a>`
}
$(function($) {
  $.ajax({
    url: '/maps',
    success: (data) => {
      if (data.logined){
      for (let map of data.maps){
      console.log(data.maps[0].url);
      $('.mapsContainer').append(insertAnchor(map.id, map.url));
      } 
    }
    else {
      for (let map of data.maps){
        console.log(data.maps[0].url);
        $('.mapsContainer').append(insertImage(map.url));
        } 
    }}
  });
});