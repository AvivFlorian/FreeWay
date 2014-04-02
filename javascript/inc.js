// PhoneGap
function getLocation() {
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
}
// onSuccess Geolocation
//
function onSuccess(position) {
	$('#geolocation').html('Latitude: '        + position.coords.latitude              + '<br />' +
						'Longitude: '          + position.coords.longitude             + '<br />' +
						'Altitude: '           + position.coords.altitude              + '<br />' +
						'Accuracy: '           + position.coords.accuracy              + '<br />' +
						'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
						'Heading: '            + position.coords.heading               + '<br />' +
						'Speed: '              + position.coords.speed                 + '<br />' +
						'Timestamp: '          + position.timestamp          + '<br />');
	
	var latitude =position.coords.latitude;
	var longitude =position.coords.longitude;
	var mapOptions = {
	  center: new google.maps.LatLng(latitude, longitude),
	  zoom: 15,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}

// onError Callback receives a PositionError object
//
function onError(error) {
	var element = document.getElementById('geolocation');
	element.innerHTML = 'code: '    + error.code    + '\n' +
			'message: ' + error.message + '\n';
}