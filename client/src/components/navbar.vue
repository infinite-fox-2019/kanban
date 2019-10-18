<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">Kanban Board</b-navbar-brand>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <div>
            <b-button v-b-modal.modal-prevent-closing>New Task</b-button>
            <b-modal
            id="modal-prevent-closing"
            ref="modal"
            title="New Task"
            @show="resetModal"
            @hidden="resetModal"
            @ok="addTask"
            >
            <form ref="form" @submit.prevent="">
                <b-form-group label="Title" label-for="title-input">
                  <b-form-input v-model="newtask.title" id="title-input" ></b-form-input>
                </b-form-group>

                <b-form-group label="Description" label-for="description-input">
                  <b-form-input v-model="newtask.description" id="description-input" ></b-form-input>
                </b-form-group>

                <b-form-group label="Point" label-for="point-input">
                  <b-form-input v-model="newtask.point" id="point-input" ></b-form-input>
                </b-form-group>

                <b-form-group label="Assigned to" label-for="assigned to-input">
                  <b-form-input v-model="newtask.assigned" id="assigned to-input" ></b-form-input>
                </b-form-group>

            </form>
            </b-modal>
        </div>
      </b-navbar-nav>
  </b-navbar>
</div>
</template>

<script>
import db from '../../config/firebase'
const task = db.collection('kanban')

export default {
  data () {
    return {
      newtask: {
        title: '',
        description: '',
        point: '',
        assigned: '',
        status: 'backlog'
      }
    }
  },
  methods: {
    addTask () {
      task.add({
        title: this.newtask.title,
        description: this.newtask.description,
        point: this.newtask.point,
        assigned: this.newtask.assigned,
        status: this.newtask.status
      })
        .then(function (docRef) {
          console.log('Document written with ID: ', docRef.id)
        })
        .catch(function (error) {
          console.error('Error adding document: ', error)
        })
    }
  }

}
</script>

<style>
.btn-secondary {
  background-color: rgba(0, 247, 144, 0.329);
}
</style>
