<template>
  <div class="card bg-light mb-3" style="max-width: 18rem;">
    <h6 class="card-header">{{ task.data.title }}</h6>
    <div class="card-body">
      <small class="card-text">score: {{ task.data.score }}</small>
      <br>
      <small class="card-text">assigned to: {{ task.data.assignedTo }}</small>
    </div>
    <div class="card-footer">
      <button type="button" class="btn btn-secondary btn-sm" data-toggle="modal" :data-target="`#${task.id}`">Detail</button>

      <!-- Modal -->
      <div class="modal fade" :id="task.id" tabindex="-1" role="dialog" aria-labelledby="detailLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="detailLabel">{{ task.data.title }}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>
                Description: {{ task.data.description }}
              </p>
              <p>
                Score: {{ task.data.score }}
              </p>
              <p>
                Assigned To: {{ task.data.assignedTo }}
                <br/>
                {{ task.data.status }}
              </p>
            </div>
            <div class="modal-footer d-flex justify-content-between">
              <div>
                <button type="button" data-dismiss="modal" class="btn btn-danger" v-if="task.data.status == 'toDo'" @click.prevent="updateStatus(task.id, 'backLog')">Back-Log</button>
                <button type="button" data-dismiss="modal" class="btn btn-info" v-if="task.data.status == 'doing'" @click.prevent="updateStatus(task.id, 'toDo')">To-Do</button>
                <button type="button" data-dismiss="modal" class="btn btn-primary" v-if="task.data.status == 'done'" @click.prevent="updateStatus(task.id, 'doing')">Doing</button>
              </div>
              <div>
                <button type="button" data-dismiss="modal" class="btn btn-danger" @click.prevent="deleteTask(task.id)">Delete</button>
              </div>
              <div>
                <button type="button" data-dismiss="modal" class="btn btn-info" v-if="task.data.status == 'backLog'" @click.prevent="updateStatus(task.id, 'toDo')">To-Do</button>
                <button type="button" data-dismiss="modal" class="btn btn-primary" v-if="task.data.status == 'toDo'" @click.prevent="updateStatus(task.id, 'doing')">Doing</button>
                <button type="button" data-dismiss="modal" class="btn btn-success" v-if="task.data.status == 'doing'" @click.prevent="updateStatus(task.id, 'done')">Done</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['task'],
  methods: {
    deleteTask (id) {
      this.$emit('deleteTask', id)
    },
    updateStatus (id, status) {
      this.$emit('updateStatus', id, status)
    }
  }
}
</script>

<style>

</style>
