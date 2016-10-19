var mymap = L.map('mapid').setView([55.94611, -3.20064], 17);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGF2aW53b25nIiwiYSI6ImNpdWc2cDZkYTAwMjgyem95d2tiYWJmcDgifQ.Lty88K5TJVxDED70r58tDg').addTo(mymap);

var circle = L.circle([55.94611, -3.20064],{
	color:'red',
	fillColor:'#f03',
	fillOpacity: 0.5,
	radius: 50
}).addTo(mymap);
