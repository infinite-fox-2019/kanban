<template>
<<<<<<< HEAD
  <div id="home">
    <NavBar @Data='submitdata'></NavBar>
=======
  <div class="home">
    <NavBar></NavBar>
>>>>>>> d2dd9f3d457e90cc7507aa0b24c51c80b2a464f2
    <TaskList></TaskList>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
import db from '../config/firestore'
import TaskList from '@/components/TaskList.vue'
export default {
  name: 'home',
  components: {
    NavBar,
    TaskList
  },
  methods: {
    submitdata: (data) => {
      console.log(data)
      db.collection('lists')
        .add(data)
        .then((result) => {
          console.log('sukses')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  data: () => {
    return {
      // submitData: ''
    }
  }
}
</script>
<<<<<<< HEAD
<style>
#home {
  background-color: aqua;
  }
</style>
=======
>>>>>>> d2dd9f3d457e90cc7507aa0b24c51c80b2a464f2
