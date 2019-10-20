var firebase = require("firebase/app");
require("firebase/firestore");

firebase.initializeApp({
    apiKey: "AIzaSyDEsTQiu7i3PdFR1d8lBkmapH9oGy9jMmM",
    authDomain: "kanban-e0ab3.firebaseapp.com",
    databaseURL: "https://kanban-e0ab3.firebaseio.com",
    projectId: "kanban-e0ab3",
    storageBucket: "kanban-e0ab3.appspot.com",
    messagingSenderId: "328974601325",
    appId: "1:328974601325:web:28d9c6b5bd5cf5c519c364",
    measurementId: "G-KHDJDKL2NL"
  })

module.exports = firebase