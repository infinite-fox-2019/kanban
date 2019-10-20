<template>
  <button class="btn btn-danger" @click="destroy">Delete</button>
</template>

<script>
import db from '../config/firestore'
import Swal from 'sweetalert2'

export default {
  name: 'deletetask',
  props: ['id'],
  methods: {
    destroy () {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          if (result.value) {
            db.collection('kanban').doc(this.id).delete()
              .then(function () {
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
              })
              .catch(function (error) {
                Swal.fire({
                  type: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
                  footer: '<a href>Why do I have this issue?</a>'
                })
                console.error('Error removing document: ', error)
              })
          }
        })
        .catch(function (error) {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
          })
          console.log(error)
        })
    }
  }
}
</script>

<style>

</style>
