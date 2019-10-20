<template>
  <div id="app">
    <Navbar style="margin-bottom: 50px;"/>

    <Modal/>

    <div class="container-fluid d-flex justify-content-center">
        <TableProgress/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import TableProgress from '@/components/TableProgress'
import Modal from './components/Modal'
import db from '@/config/firebase'

export default {
  components: {
    Navbar,
    TableProgress,
    Modal
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
</style>
