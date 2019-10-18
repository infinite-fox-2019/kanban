// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require('firebase/app')

// Add the Firebase products that you want to use
require('firebase/auth')
require('firebase/firestore')

firebase.initializeApp({
  apiKey: 'AIzaSyBYqPhYqYHrf9pPZJK7uDgAcsF-gkXy0Rc ',
  authDomain: 'kanban-7c2f5.firebaseapp.com',
  projectId: 'kanban-7c2f5'
})

var db = firebase.firestore()

module.exports = db
