<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click.prevent="test()">KLIK</button>
  </div>
</template>

<script>
import db from '../../config/firestore'
export default {
  methods: {
    test () {
      db.collection('users').add({
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
    }
  }
}
</script>
