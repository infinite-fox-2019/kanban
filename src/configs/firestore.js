const firebase = require('./firebase')

var db = firebase.firestore()

module.exports = db

/* let docRef = db.collection('users').doc('alovelace');
let setAda = docRef.set({
  first: 'Ada',
  last: 'Lovelace',
  born: 1815
});

db.collection('toDos').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  }); */
