const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCqiCN8Kj_qp6C0EhuyIaQgs7xDPIevP54",
  authDomain: "kanban-61877.firebaseapp.com",
  databaseURL: "https://kanban-61877.firebaseio.com",
  projectId: "kanban-61877",
  storageBucket: "kanban-61877.appspot.com",
  messagingSenderId: "313416562975",
  appId: "1:313416562975:web:357305f46f4ff74a47982a"
});

var db = firebase.firestore();

module.exports = db