<template>
<div>
  <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Add new task"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            class="my-1"
            :states="states.titleState"
            label="Title"
            label-for="title-input"
            invalid-feedback="Title is required"
          >
            <b-form-input
              id="title-input"
              v-model="task.title"
              :state="states.titleState"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            class="my-1"
            :state="states.descriptionState"
            label="Description"
            label-for="description-input"
            invalid-feedback="Description is required"
          >
            <b-form-input
              id="description-input"
              v-model="task.description"
              :state="states.descriptionState"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            class="my-1"
            :state="states.pointState"
            label="Point"
            label-for="point-input"
            invalid-feedback="Point is required"
          >
            <b-form-input
              id="point-input"
              v-model="task.point"
              :state="states.pointState"
              type="number"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            class="my-1"
            :state="states.assigned_toState"
            label="assigned_to"
            label-for="assigned_to-input"
            invalid-feedback="Assigned to is required"
          >
            <b-form-input
              id="assigned_to-input"
              v-model="task.assigned_to"
              :state="states.assigned_toState"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            class="my-1"
            :state="states.statusState"
            label="status"
            label-for="status-input"
            invalid-feedback="Status to is required"
          >
            <b-form-select v-model="task.status" class="mb-3">
              <option value="backlog" selected>Back Log</option>
              <option value="todo">To Do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </b-form-select>
          </b-form-group>
        </form>
  </b-modal>
</div>
</template>

<script>
import db from '@/config/firebase'
const tasks = db.collection('tasks')

export default {
  name: 'Modal',
  data () {
    return {
      name: '',
      states: {
        titleState: null,
        descriptionState: null,
        pointState: null,
        assigned_toState: null,
        statusState: null
      },
      submittedNames: [],
      task: {
        title: '',
        description: '',
        point: '',
        assigned_to: '',
        status: ''
      }
    }
  },
  methods: {
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid ? 'valid' : 'invalid'
      return valid
    },
    resetModal () {
      this.task.title = ''
      this.task.description = ''
      this.task.point = ''
      this.task.assigned_to = ''
      this.task.status = 'backlog'
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit () {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the task to firebase
      tasks.add(this.task)
        .then(docRef => {
          console.log('Task added with id', docRef.id)
        })
        .catch(err => {
          console.log(err)
        })
      this.$nextTick(() => {
        this.$refs.modal.hide()
      })
    }
  }
}
</script>
