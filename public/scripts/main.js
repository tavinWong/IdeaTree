var latTemp = 55.9460772;
var lngTemp = -3.2008286;

var mymap = L.map('mapid').setView([55.9460772, -3.2008286], 17);
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGF2aW53b25nIiwiYSI6ImNpdWc2cDZkYTAwMjgyem95d2tiYWJmcDgifQ.Lty88K5TJVxDED70r58tDg').addTo(mymap);

var lc = L.control.locate({
	position:'topright',
	string: {
		popup:'Big bro is watching you'
	}
}).addTo(mymap);
lc.start();

var circle = L.circle([latTemp, lngTemp],{
	color:'red',
	fillColor:'#f03',
	fillOpacity: 0.5,
	radius: 50
}).addTo(mymap);

function getLocation() {
	navigator.geolocation.getCurrentPosition(success, error, options);
}

function success(pos) {
  var crd = pos.coords;

  console.log('--------');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);

};

function error(err) {
  alert('ERROR(' + err.code + '): ' + err.message);
};