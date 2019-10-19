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
import URI from 'urijs'
import firebase from 'firebase'
import swal from 'sweetalert2'
export default {
  name: 'home',
  components: {
    NavBar,
    TaskList
  },
  methods: {
    submitdata: (data) => {
      swal.fire({
        title: 'Now Loading',
        showConfirmButton: false,
        allowOutsideClick: () => swal.isLoading()
      })
      console.log(data)
      db.collection('lists')
        .add(data)
        .then((result) => {
          swal.close()
          swal.fire({
            type: 'success',
            title: 'Success creating Task',
            showConfirmButton: false,
            timer: 2000
          })
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
  },
  created () {
    let uri = URI(window.location.href)
    console.log(uri)
    let uid = firebase.database().ref(`games`).push({
      game: 'testing'
    })
    let key = uid.key
    // console.log(window.location.origin, uid, key)
    console.log(`${window.location.origin}/?join=${key}`)
    let { join: gameId } = uri.query(true)
    console.log(gameId)
  }
}
</script>
<style>
</style>
