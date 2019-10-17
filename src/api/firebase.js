const firebase = require('firebase/app')
require('firebase/firestore')

firebase.initializeApp({
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  projectId: process.env.VUE_APP_PROJECTID
})

var db = firebase.firestore()

module.exports = db
