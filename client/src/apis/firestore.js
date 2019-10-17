'use strict'

// ES6
import firebase from './firebase'

console.log(firebase, 'firebase')
console.log(firebase.firestore, 'firebase')
const db = firebase.firestore()

export default db
