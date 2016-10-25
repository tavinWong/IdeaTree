var latTemp = 55.9460000;
var lngTemp = -3.20000000;

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


var circle = L.circle([55.9460772, -3.2008286],{
	color:'red',
	fillColor:'#f03',
	fillOpacity: 0.5,
	radius: 50
}).addTo(mymap);


//seed forms 

var seedIcon1 = L.icon({
	iconUrl: 'images/1.png',
    iconSize:     [31, 66],
    iconAnchor:   [15, 66],
    popupAnchor:  [0, -60]
});

var seedIcon2 = L.icon({
	iconUrl: 'images/2.png',
    iconSize:     [33, 80],
    iconAnchor:   [15, 80],
    popupAnchor:  [0, -80]
});

var seedIcon3 = L.icon({
	iconUrl: 'images/3.png',
    iconSize:     [40, 100],
    iconAnchor:   [20, 100],
    popupAnchor:  [0, -100]
});


L.marker([55.9463, -3.201], {icon: seedIcon1}).addTo(mymap).bindPopup("Winter is coming!");
L.marker([55.9455, -3.202], {icon: seedIcon2}).addTo(mymap).bindPopup("My life is a joke");
L.marker([55.9450, -3.200], {icon: seedIcon3}).addTo(mymap).bindPopup("We got a fantastic view of castle up here");


function getLocation() {
	//navigator.geolocation.getCurrentPosition(success, error, options);
}

function success(pos) {
  var crd = pos.coords;
  console.log('pass');
  latTemp = crd.latitude;
  lngTemp = crd.longitude;
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);

  if (chatbase.messageInput.value && chatbase.checkSignedInWithMessage()) {
    var currentUser = chatbase.auth.currentUser;
    chatbase.seedsRef.push({
      name: currentUser.displayName,
      text: chatbase.messageInput.value,
      lat: latTemp,
      lng: lngTemp
    }).then(function() {
      // Clear message text field and SEND button state.
      chatbase.messageInput.value = '';

    }.bind(chatbase)).catch(function(error) {
      console.error('Error writing new message to Firebase Database', error);
    });
  }

};

function error(err) {
  alert('ERROR(' + err.code + '): ' + err.message);
};