import { appendMap, appendSearch, addMarker } from "./helpers.js";
// const userItemView = user => {
//   const $item = $(`<div class='user'>${user.email}</div>`);
//   $item.on("click", () => alert("hello" + user.email));
//   return $item;
// };

// const userPageView = users => {
//   const $page = $(`<div class='page'></div>`);
//   for (user of users) {
//     $page.append(userItemView(user));
//   }
//   return $page;
// };

// const loadUserPage = () => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done(response => {
//     $("main").html(userPageView(response.users));
//   });
// };

// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done(users => {
//     for (user of users) {
//       $("<div>")
//         .text(user.name)
//         .appendTo($("body"));
//     }
//   });
// });

$(function($) {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done(users => {
    console.log("getting users");
    for (user of users) {
      $("<div>")
        .text(user.name)
        .appendTo($("body"));
    }
  });

  let $map = document.getElementById("map");
  let map = document.getElementById("map").gMap;
  //showing user page
  $.ajax({
    method: "GET",
    url: "/login"
  }).done(() => {
    // $("#right").append(appendMap());
    // $("#searchPlace").click(function() {
    //   appendSearch();
  });
});

$.ajax({
  method: "GET",
  url: "/map"
}).done(() => {
  console.log("hihihihi");
  $("#right").append(appendMap());

  $("#searchPlace").click(function() {
    appendSearch();
    $("#map").append(appendMap());
    $("#searchPlace").click(function() {
      appendSearch();
    });
  });
  // $("#map").append(appendMap());
  // $("#searchPlace").click(function() {
  //   appendSearch();
  // });
  $.ajax({
    method: "GET",
    url: "/"
  }).done(() => {
    $("#map").append(appendMap());
    $("#searchPlace").click(function() {
      appendSearch();
    });
  });
});

// $.ajax({
//   method: "GET",
//   url: "/"
// }).done(() => {
$("#map1").click(function() {
  getAllReservations()
    .then(function(json) {
      propertyListings.addProperties(json.reservations, true);
      views_manager.show("listings");
    })
    .catch(error => console.error(error));
});
// });

// $(".buttons .login").click(function () {
//   $("#login-form").css("display", "block");
// });

// $.ajax({
//   method: "GET",
//   url: "/"
// }).done(() => {

// });

$("#buttons .login").click(function() {
  $("#login-form").css("display", "block");
});

$(".item").click(function() {
  let url = $(this).attr("href");
  alert(url);
  $("#right").load(url + " #right >*");
  return false;
});
// });
$(".item").click(function() {
  let url = $(this).attr("href");
  alert(url);
  $("#right").load(url);
  return false;
});

jQuery(document).ready(function() {
  $("#map").click(function() {
    // $("body").append(appendSearch());
    let map = document.getElementById("map").gMap;
    console.log(map);
    google.maps.event.addListener(map, "rightclick", function(event) {
      console.log(map);
      var lat = event.latLng.lat();
      var lng = event.latLng.lng();
      // populate yor box/field with lat, lng
      alert("Lat=" + lat + "; Lng=" + lng);
    });
  });
});
