<template>
    <div>
        <b-button id="show-btn" @click="showModal" class="btn btn-success">Add Task</b-button>

        <b-modal ref="my-modal" hide-footer title="Add New Task Here">
            <form>
                <div class="d-block text-center">
                    <input type="text" placeholder="Title" v-model="title"><br />
                    <input type="text" placeholder="Description" v-model="description"><br />
                    <input type="text" placeholder="Assigned To" v-model="assignto"><br />
                </div>
                <b-button class="mt-3" variant="outline-success" block @click="addtask">Add Task</b-button>
                <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Cancel</b-button>
            </form>
        </b-modal>
    </div>
</template>

<script>
import db from '../config/firestore'
import Swal from 'sweetalert2'

export default {
  name: 'addtask',
  data () {
    return {
      title: '',
      description: '',
      assignto: ''
    }
  },
  methods: {
    showModal () {
      this.$refs['my-modal'].show()
    },
    hideModal () {
      this.$refs['my-modal'].hide()
    },
    addtask () {
      db.collection('kanban').add({
        name: this.title,
        desc: this.description,
        assignto: this.assignto,
        point: 0,
        status: 'backlog'
      })
        .then((docRef) => {
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          this.title = ''
          this.description = ''
          this.assignto = ''
          this.hideModal()
        })
        .catch((error) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
          })
          console.error('Error adding document: ', error)
        })
    }
  }
}
</script>

<style>
input{
  width: 100%;
  background-color: #91c6e5 !important;
}
.modal-content {
  background-color: #91c6e5 !important;
  color: antiquewhite;
  text-shadow: 1px 1px #166989;
}
</style>
