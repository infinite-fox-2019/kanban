const firebase = require('./firebase')

const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

module.exports = { provider,auth }
