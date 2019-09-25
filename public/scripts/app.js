import {
  appendMap,
  appendSearch,
  checkMapCollections
} from "./helpers.js";

$(function($) {
  $("#homepage header nav .login").click(function() {
    if ($("#login-form").css("display") == "none") {
      $("#login-form").slideDown();
    } else {
      $("#login-form").slideUp();
    }
  });
  $("#homepage header nav .signup").click(function() {
    // alert("hiiii");
    if ($("#singup").css("display") == "none") {
      $("#singup").slideDown();
    } else {
      $("#singup").slideUp();
    }
  });

  // $("#map-collections .disabled").click(function() {
  //   alert("hiiii1");
  //   $("#login-form").css("display", "block");
  // });

  //check checkBox to show map collection sections
  checkMapCollections("favorite");
  checkMapCollections("foody");
  checkMapCollections("camping");

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

  $.ajax({
    method: "GET",
    url: "/map"
  }).done(() => {
    $("#right").append(appendMap());

    $("#searchPlace").click(function() {
      appendSearch();
      // $("#map").append(appendMap());
      // $("#searchPlace").click(function() {
      //   appendSearch();
      // });
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

  // });
  $(".item").click(function() {
    let url = $(this).attr("href");
    alert(url);
    $("#right").load(url);
    return false;
  });
});
