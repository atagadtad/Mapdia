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
function appendMap() {
  return `<div>
  <script type="text/javascript" src="/scripts/map.js"></script>
  <script async defer
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCZImsQ1Qw68YIf_tHVOoMhs5wz5-F4JHA&callback=initMap">
  </script>
  </div>`;
}

$(function() {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });
  // console.log('do i work??');
  // // appendMap();
  // let $map = appendMap();
  // console.log($map);
  // let $body = $("body");
  // console.log($body);
  // $body.append($map);

  // $.ajax({
  //   method: "GET",
  //   url: "/"
  // }).done(() => {

  // });
});

