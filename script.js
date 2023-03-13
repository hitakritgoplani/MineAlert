const heartrate_lower_threshold = 60;
<<<<<<< HEAD
const heartrate_upper_threshold = 135;
const accelerometer_threshold = 8;
const body_temperature_lower_threshold = 34;
const body_temperature_upper_threshold = 40;
const smoke_threshold = 400;

=======
const heartrate_upper_threshold = 120;
const accelerometer_threshold = 8;
const temperature_lower_threshold = 10;
const temperature_upper_threshold = 43;
const smoke_threshold = 0.8;
>>>>>>> 5a5ae88d384e1d02a54b9c377301ce29d862b592

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
