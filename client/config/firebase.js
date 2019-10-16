const firebase = require('firebase/app')
// Required for side-effects
require('firebase/firestore')

firebase.initializeApp({
  apiKey: 'AIzaSyCdZoW8DBa43XATx5qSlduQc6mZYmI09zA',
  authDomain: 'kamvan-d66ed.firebaseapp.com',
  projectId: 'kamvan-d66ed'
})

var db = firebase.firestore()

db.collection('kamvan').add({
  first: 'Ada',
  last: 'Lovelace',
  born: 1815
})
  .then(function (docRef) {
    console.log('Document written with ID: ', docRef.id)
  })
  .catch(function (error) {
    console.error('Error adding document: ', error)
  })

module.exports = db
