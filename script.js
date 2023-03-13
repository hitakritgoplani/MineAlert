$(document).ready(function () {
  loadContent("./pages/dashboard.html");

  $("#option1").click(function (event) {
    event.preventDefault();
    loadContent("./pages/dashboard.html");
  });

  $("#option2").click(function (event) {
    event.preventDefault();
    loadContent("./pages/surrounding_temp.html");
  });

  $("#option3").click(function (event) {
    event.preventDefault();
    loadContent("./pages/body_temp.html");
  });

  $("#option4").click(function (event) {
    event.preventDefault();
    loadContent("./pages/heart_rate.html");
  });

  $("#option5").click(function (event) {
    event.preventDefault();
    loadContent("./pages/smoke.html");
  });

  $("#option6").click(function (event) {
    event.preventDefault();
    loadContent("./index.html");
  });

  $(".search-miner").click(function (event) {
    event.preventDefault();
    loadContent("./pages/miner_profile.html");
  });

});

function loadContent(url) {
  $.ajax({
    url: url,
    type: "GET",
    success: function (data) {
      $("#content-container").html(data);
    },
    error: function () {
      console.log("Error loading content");
    },
  });
}
