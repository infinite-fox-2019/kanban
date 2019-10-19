const firebase = require('firebase/app')
// Required for side-effects
require('firebase/firestore')

firebase.initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: `${process.env.VUE_APP_PROJECT_ID}`,
  storageBucket: 'kanban-h8-8a396.appspot.com',
  databaseURL: 'https://kanban-h8-8a396.firebaseio.com'
})

module.exports = firebase
