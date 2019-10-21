var firebase = require('firebase/app')
require('firebase/firestore')

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyBiLwnkCnL2N8d8hWZq3ZZznxe2GQlq4uA',
  authDomain: 'pain-1287.firebaseapp.com',
  projectId: 'pain-1287'
})

module.exports = firebase
