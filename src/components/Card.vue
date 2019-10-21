<template>

    <b-card style="color:black" :header="data.title" class="text-center mb-3">
      <b-card-text>{{data.description}}</b-card-text>
      <b-button variant="danger" @click.prevent="deleteData(data.id)">Delete</b-button>
    </b-card>

</template>

<script>
import Swal from 'sweetalert2'
import db from '../api/firebase'
const task = db.collection('backlog')

export default {
  name:"Card",
  props:['data'],
  methods:{
    deleteData (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          task.doc(`${id}`).delete().then(function () {
            console.log('Document successfully deleted!')
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }).catch(function (error) {
            console.error('Error removing document: ', error)
            Swal.fire(
              'Awww!',
              'Somethin wrong. Please try again later.',
              'error'
            )
          })
        }
      })
    },
  }
    
  
}
</script>

<style scoped>

</style>
