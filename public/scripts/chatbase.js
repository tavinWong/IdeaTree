'use strict'


function chatbase(){
	this.checkSetup(); //this refers to chatbase object

	this.signInButton = document.getElementById('sign-in');
	this.signInButton.addEventListener('click', this.signIn.bind(this));
	this.signOutButton = document.getElementById('sign-out');
	this.signOutButton.addEventListener('click', this.signOut.bind(this));

  this.messageInput = document.getElementById('message');
  this.ideaSent = document.getElementById('ideaSent');
  this.ideaSent.addEventListener('click', this.saveMessage.bind(this));

	//user info 
  	this.userPic = document.getElementById('user-pic');
  	this.userName = document.getElementById('user-name');

	this.initFirebase();
  this.loadSeeds();
}

chatbase.prototype.initFirebase = function() {
  // Shortcuts to Firebase SDK features.
  this.auth = firebase.auth();
  this.database = firebase.database();
  this.storage = firebase.storage();
  // Initiates Firebase auth and listen to auth state changes.
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

chatbase.prototype.loadSeeds = function() {
  // Reference to the /messages/ database path.
  this.seedsRef = this.database.ref('seeds');
  // Make sure we remove all previous listeners.
  this.seedsRef.off();

  /** load seeds
  var setMessage = function(data) {
    var val = data.val();
    this.displayMessage(data.key, val.name, val.text, val.photoUrl, val.imageUrl);
  }.bind(this);
  this.messagesRef.limitToLast(12).on('child_added', setMessage);
  this.messagesRef.limitToLast(12).on('child_changed', setMessage);
  **/
};

/**--------------------------------------signIn/out App---------------------------------**/
chatbase.prototype.signIn = function() {
  var provider = new firebase.auth.GoogleAuthProvider();
  this.auth.signInWithPopup(provider);
};

chatbase.prototype.signOut = function() {
  this.auth.signOut();
};

// Triggers when the auth state change for instance when the user signs-in or signs-out.
chatbase.prototype.onAuthStateChanged = function(user) {
  if (user) { // User is signed in!
    // Get profile pic and user's name from the Firebase user object.
    var profilePicUrl = user.photoURL;
    var userName = user.displayName;

    // Set the user's profile pic and name.
    this.userPic.style.backgroundImage = 'url(' + (profilePicUrl || '/images/profile_placeholder.png') + ')';
    this.userName.textContent = userName;

    // Show user's profile and sign-out button.
    this.userName.removeAttribute('hidden');
    this.userPic.removeAttribute('hidden');
    this.signOutButton.removeAttribute('hidden');

    // Hide sign-in button.
    this.signInButton.setAttribute('hidden', 'true');

    // We load currently existing chant messages.
    this.loadSeeds();
  } else { // User is signed out!
    // Hide user's profile and sign-out button.
    this.userName.setAttribute('hidden', 'true');
    this.userPic.setAttribute('hidden', 'true');
    this.signOutButton.setAttribute('hidden', 'true');

    // Show sign-in button.
    this.signInButton.removeAttribute('hidden');
  }
};

// Returns true if user is signed-in. Otherwise false and displays a message.
chatbase.prototype.checkSignedInWithMessage = function() {
  // Return true if the user is signed in Firebase
  if (this.auth.currentUser) {
    return true;
  }

  // Display a message to the user using a Toast.
  var data = {
    message: 'You must sign-in first',
    timeout: 2000
  };
  this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
  return false;
};
/**--------------------------------------END signIn/out App---------------------------------**/

chatbase.prototype.saveMessage = function(e) {
  e.preventDefault();
  //change temp position
  navigator.geolocation.getCurrentPosition(success, error, options);

};
/**
chatbase.prototype.success = function(pos) {
  var crd = pos.coords;
console.log('pass');
  latTemp = crd.latitude;
  lngTemp = crd.longitude;
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);

  if (this.messageInput.value && this.checkSignedInWithMessage()) {
    var currentUser = this.auth.currentUser;
    this.seedsRef.push({
      name: currentUser.displayName,
      text: this.messageInput.value,
      lat: latTemp,
      lng: lngTemp
    }).then(function() {
      // Clear message text field and SEND button state.
      this.messageInput.value = '';

    }.bind(this)).catch(function(error) {
      console.error('Error writing new message to Firebase Database', error);
    });
  }


};

chatbase.prototype.error = function(err) {
  console.log('error');
  alert('ERROR(' + err.code + '): ' + err.message);
};
**/

chatbase.prototype.changeTempLocation = function(position){
  lngTemp = position.coords.longitude; 
  latTemp = position.coords.latitude;
}

chatbase.resetTextfield = function(element) {
  element.value = '';
  //element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
};

chatbase.prototype.checkSetup = function(){
  if (!window.firebase || !(firebase.app instanceof Function) || !window.config) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions.');
  } else if (config.storageBucket === '') {
    window.alert('Your Firebase Storage bucket has not been enabled. Sorry about that. This is ' +
        'actually a Firebase bug that occurs rarely. ' +
        'Please go and re-generate the Firebase initialisation snippet (step 4 of the codelab) ' +
        'and make sure the storageBucket attribute is not empty. ' +
        'You may also need to visit the Storage tab and paste the name of your bucket which is ' +
        'displayed there.');
  }
}

window.onload = function() {
	window.chatbase = new chatbase();
}