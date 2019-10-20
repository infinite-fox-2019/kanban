const firebase = require('firebase/app')
// Required for side-effects
// require("firebase/firestore")

require('firebase/firestore')
require('firebase/auth')

firebase.initializeApp({
  apiKey: 'AIzaSyCx-m8FWY-tMwfXRmZLT7GoJx5d7j6d5FE',
  authDomain: 'kanban-a2214.firebaseapp.com',
  databaseURL: 'https://kanban-a2214.firebaseio.com',
  projectId: 'kanban-a2214',
  storageBucket: 'kanban-a2214.appspot.com',
  messagingSenderId: '930410821260',
  appId: '1:930410821260:web:a7b22a0b8cbb2dd68f2da9',
  measurementId: 'G-YBW3CM2BW6'
})

module.exports = firebase
