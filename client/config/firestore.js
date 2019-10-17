const firebase = require('./firebase')

require("firebase/firestore");
var firebaseConfig = {
    apiKey: "AIzaSyAzkfSEUNMBtYrmhWQZyXqKU7DU-MRi7RU",
    authDomain: "sansban-22f96.firebaseapp.com",
    databaseURL: "https://sansban-22f96.firebaseio.com",
    projectId: "sansban-22f96",
    storageBucket: "sansban-22f96.appspot.com",
    messagingSenderId: "95113561834",
    appId: "1:95113561834:web:5f495e1f9548292029f993"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

module.exports = db 