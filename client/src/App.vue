<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
      <h1 class="title">KANBAN</h1>
      <addtask />
    </div>
    <router-view/>
  </div>
</template>

<script>
import addtask from './components/addtask'

export default {
  name: 'home',
  components: {
    addtask
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

html{
  height: 100%;
}

body {
  height: 100%;
  background-image: url('./assets/background.jpeg');
  background-color: #1a0808;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.title {
  color: antiquewhite;
  font-family: 'Pacifico', cursive;
  text-shadow: 5px 5px #166989;
}

</style>
