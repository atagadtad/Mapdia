function insertImage(src) {
  return `<img src="${src}">`;
}
function insertAnchor(mapId, src) {
  let imgtag = insertImage(src);
  return `<a href="/showmap/${mapId}"><img src="${src}"></a>`;
}
<<<<<<< HEAD
=======
$(function ($) {
>>>>>>> 6915723d5a354658da6a375f4b5c39fc169995f2

$(function($) {
  $.ajax({
<<<<<<< HEAD
    url: "/maps",
    success: data => {
      for (let map of data.maps) {
        console.log(data.maps[0].url);
        $(".mapsContainer").append(insertAnchor(map.id, map.url));
      }
    }
  });
});
=======
    url: '/maps',
    success: (data) => {
      for (let map of data.maps) {
        console.log(data.maps[0].url);
        $('.mapsContainer').append(insertAnchor(map.id, map.url));
      }
    }
  });

  $("#searchbutton").click(function (event) {
    event.preventDefault();
    $('.mapsContainer').empty();
    let text = $("#searchtext").val()
    console.log('text: ', text)
    $.ajax({
      type: "GET",
      url: '/search',
      data: { search: text },
      success: (data) => {
        console.log(data)
        // console.log(data.maps[0].maps)
        for (let map of data.maps) {
          // console.log(data.maps[0].url);
          $('.mapsContainer').append(insertAnchor(map.id, map.url));
        }
      }
    })

    // $('.mapsContainer').append(insertAnchor(map.id, map.url));


  })
})
>>>>>>> 6915723d5a354658da6a375f4b5c39fc169995f2
