// eslint-disable-next-line no-unused-vars
var appFireBase = (function() {
  var config = {
    apiKey: firebase.password,
    authDomain: "scenic-pro2.firebaseapp.com",
    databaseURL: "https://scenic-pro2.firebaseio.com",
    projectId: "scenic-pro2",
    storageBucket: "",
    messagingSenderId: "755781268373",
    appId: "1:755781268373:web:ca9d87ccca610859"
  };

  firebase.initializeApp(config);

  appFireBase = firebase;
})();
