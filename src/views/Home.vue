<template>
  <div id="home">
    <NavBar @Data='submitdata'></NavBar>
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
<style>
#home {
  background-color: aqua;
  }
</style>
