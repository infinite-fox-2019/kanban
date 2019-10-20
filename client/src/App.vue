<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/board">Board</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 10px;
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.322);
  margin-bottom: 1.5rem;
  background-color: #222E48;
  font-family: 'Raleway', sans-serif; 
  color: white;
  font-size: 25px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
