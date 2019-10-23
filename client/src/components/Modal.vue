<template>
  <div class="modal fade" id="modalLoginForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header text-center">
                <h4 class="modal-title w-100 font-weight-bold">New Task</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body mx-3">
                <div class="md-form mb-5">
                    <input v-model="task.title" type="text" id="defaultForm-email" class="form-control" required>
                    <label data-error="wrong" data-success="right" for="defaultForm-email">Task Name</label>
                </div>

                <div class="md-form mb-4">
                    <input v-model="task.description" type="text" id="defaultForm-pass" required class="form-control">
                    <label data-error="wrong" data-success="right" for="defaultForm-pass">Task Description</label>
                </div>

            </div>
            <div class="modal-footer d-flex justify-content-center">
                <button class="btn btn-default" @click.prevent="addTask">Submit</button>
            </div>
        </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      task: {
        title: '',
        description: '',
        status: 'todo' // default
      }
    }
  },
  methods: {
    addTask () {
      let task = { title: this.task.title, description: this.task.description, status: this.task.status }
      if (task.title.length > 0 && task.description.length > 0) {
        this.$emit('addTask', task)
      } else {
        alert('Title and description is required.')
      }
      this.task.title = ''
      this.task.description = ''
    }
  }
}
</script>

<style>

</style>
