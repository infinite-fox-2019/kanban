<template>
  <div class="modal fade" :id="task.id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header text-center">
              <h4 class="modal-title w-100 font-weight-bold">Edit Task</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body mx-3">
              <div class="md-form mb-5">
                <input  v-model="task.title" type="text" id="defaultForm-email" class="form-control validate" placeholder="title">
              </div>

              <div class="md-form mb-4">
                <input v-model="task.description" type="text" id="defaultForm-pass" class="form-control validate" placeholder="description">
              </div>

            </div>
            <div class="modal-footer d-flex justify-content-center">
              <button @click.prevent="updateTask" class="btn btn-info" data-dismiss="modal" aria-label="Close">Edit</button>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import db from '@/config/fireStore.js'
export default {
  props: ['task'],
  methods: {
    updateTask () {
      db.collection('task')
        .doc(this.task.id)
        .update(this.task)
        .then(() => {

        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}

</script>

<style>

</style>
