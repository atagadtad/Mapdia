function insertImage(src) {
  return `<img src="${src}">`;
}
function insertAnchor(mapId, src) {
  let imgtag = insertImage(src);
  return `<a class ='anchormap' href="/showmap/${mapId}"><img src="${src}"></a>`;
}

$(function ($) {
  $.ajax({
    url: '/maps',
    success: (data) => {
      console.log(data);
      if (data.logined) {
        for (let i = 0; i < data.maps.length - 1; i++) {
          $('.rowContainer').append(`<div class="column"`).append(`</div>`)
            .append(insertAnchor(data.maps[i].id, data.maps[i].url))
            .append(insertAnchor(data.maps[i + 1].id, data.maps[i + 1].url))

        }
      }
      else {
        for (let map of data.maps) {
          $('.mapsContainer').append(insertImage(map.url));
        }
      }
    }
  });
  $.ajax({
    url: '/maps/getfavorites',
    success: (data) => {
      console.log(data);
      if (data.logined) {
        for (let map of data.maps) {
          console.log(data.maps[0].url);
          $('.favorites').append(insertAnchor(map.id, map.url));
        }
      } else {
        for (let map of data.maps) {
          console.log(data.maps[0].url);
          $('.favorites').append(insertImage(map.url));
        }
      }
    }
  });
  $("#searchbutton").click(function (event) {
    event.preventDefault();
    $(".mapsContainer").empty();
    let text = $("#searchtext").val();
    console.log("text: ", text);
    $.ajax({
      type: "GET",
      url: "/search",
      data: { search: text },
      success: data => {
        console.log(data);
        // console.log(data.maps[0].maps)
        for (let map of data.maps) {
          // console.log(data.maps[0].url);
          $(".mapsContainer").append(insertAnchor(map.id, map.url));
        }
      }
    });

    // $('.mapsContainer').append(insertAnchor(map.id, map.url));
  });
});
