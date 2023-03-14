var heartrate_lower_threshold = 60;
var heartrate_upper_threshold = 135;
var accelerometer_threshold = 8;
var body_temperature_lower_threshold = 33;
var body_temperature_upper_threshold = 44;
var temperature_lower_threshold = 15;
var temperature_upper_threshold = 47;
var smoke_threshold = 1000;

function getvalues() {
	heartrate_lower_threshold = document.getElementById('lower_threshold_heart').value;
	heartrate_upper_threshold = document.getElementById('upper_threshold_heart').value;
	body_temperature_lower_threshold = document.getElementById('lower_threshold_body').value;
	body_temperature_upper_threshold = document.getElementById('upper_threshold_body').value;
	temperature_lower_threshold = document.getElementById('lower_threshold_surr').value;
	temperature_upper_threshold = document.getElementById('upper_threshold_surr').value;
	smoke_threshold = document.getElementById('smoke_threshold').value;
}

// export {heartrate_lower_threshold, heartrate_upper_threshold, accelerometer_threshold, body_temperature_lower_threshold, body_temperature_upper_threshold, temperature_lower_threshold, temperature_upper_threshold, smoke_threshold}