<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/kanban">Kanban</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
// import db from '../config/firestore'

export default {
  created () {
    // db.collection('users').add({
    //   first: 'Ada',
    //   last: 'Lovelace',
    //   born: 1815
    // })
    //   .then(function (docRef) {
    //     console.log('Document written with ID: ', docRef.id)
    //   })
    //   .catch(function (error) {
    //     console.error('Error adding document: ', error)
    //   })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 10px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
