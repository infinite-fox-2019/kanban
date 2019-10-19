const firebase = require('./firebase')
// Required for side-effects
require('firebase/firestore')

const db = firebase.firestore()

module.exports = db
