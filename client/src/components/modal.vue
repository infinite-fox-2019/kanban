<template>
  <div class="modal fade" :id="status" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header text-center">
              <h4 class="modal-title w-100 font-weight-bold">Add New Task</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body mx-3">
              <div class="md-form mb-5">
                <input  v-model="title" type="text" id="defaultForm-email" class="form-control validate">
                <label data-error="wrong" data-success="right" for="defaultForm-email">Title</label>
              </div>

              <div class="md-form mb-4">
                <input v-model="description" type="text" id="defaultForm-pass" class="form-control validate">
                <label data-error="wrong" data-success="right" for="defaultForm-pass">description</label>
              </div>

            </div>
            <div class="modal-footer d-flex justify-content-center">
              <button @click.prevent="createTask" class="btn btn-default" data-dismiss="modal" aria-label="Close">Add</button>
            </div>
          </div>
        </div>
      </div>

</template>

<script>
import db from '@/config/fireStore.js'

export default {
  data () {
    return {
      title: '',
      description: ''
    }
  },
  props: ['status'],
  methods: {
    createTask () {
      db.collection('task').add({
        title: this.title,
        description: this.description,
        status: this.status
      })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id)
          this.title = ''
          this.description = ''
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
        })
    }
  }
}
</script>

<style>

</style>
