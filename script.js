$(document).ready(function() {

	loadContent('./pages/dashboard.html');

	$('#option0').click(function(event) {
		event.preventDefault();
		loadContent('../pages/dashboard.html');
	  });

	$('#option1').click(function(event) {
	  event.preventDefault();
	  loadContent('./pages/dashboard.html');
	});
	
	$('#option2').click(function(event) {
	  event.preventDefault();
	  loadContent('./pages/body_temp.html');
	});
	
	$('#option3').click(function(event) {
	  event.preventDefault();
	  loadContent('./pages/pulse_rate.html');
	});
	
	$('#option4').click(function(event) {
		event.preventDefault();
		loadContent('./pages/fall_sensor.html');
	});

  });
  
  function loadContent(url) {
	$.ajax({
	  url: url,
	  type: 'GET',
	  success: function(data) {
		$('#content-container').html(data);
	  },
	  error: function() {
		console.log('Error loading content');
	  }
	});
  }
  
