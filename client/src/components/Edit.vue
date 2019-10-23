<template>
  <div class="modal fade" :id="task.id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header text-center">
                <h4 class="modal-title w-100 font-weight-bold">Edit</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body mx-3">
                <div class="md-form mb-5">
                    <input v-model="task.title" type="text" id="defaultForm-email" class="form-control" value="task.title">
                </div>

                <div class="md-form mb-4">
                    <input v-model="task.description" type="text" id="defaultForm-pass" value="task.description" class="form-control">
                </div>

            </div>
            <div class="modal-footer d-flex justify-content-center">
                <button class="btn btn-default" @click.prevent="updateTask">Submit</button>
            </div>
        </div>
  </div>
</div>
</template>

<script>
import db from '../config/firestore'
export default {
  props: ['task'],
  methods: {
    updateTask () {
      db.collection('tasks').doc(this.task.id).update(this.task)
        .then(success => {
          alert('success updated task')
        })
        .catch(console.log)
    }
  },
  created () {
    console.log(this.task)
  }
}
</script>

<style>

</style>
