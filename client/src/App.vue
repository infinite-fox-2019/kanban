<template>
  <div id="app">
      <b-navbar toggleable="lg" type="light" class="mb-4">
          <b-navbar-brand href="#"><img src="./assets/kamban.png" alt="logo" class="logo-kanban"></b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
              <b-nav-item v-b-modal.modalTask><p style="color:white; font-weight:bold;">New Task</p></b-nav-item>
          </b-navbar-nav>
          </b-collapse>
      </b-navbar>
      <!-- untuk modal -->
      <b-modal
        id="modalTask"
        title="Add new tasks"
        ref="modal"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <!-- form -->
        <b-form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label="Title"
            label-for="title-input"
          >
            <b-form-input
              id="title-input"
              v-model="name"
              placeholder="Task title"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Description"
            label-for="desc-input"
          >
            <b-form-textarea
              id="desc-input"
              v-model="desc"
              placeholder="Task description..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>
          <b-form-group
            label="Assign To"
            label-for="assign-input"
          >
            <b-form-input
              id="assign-input"
              v-model="assignedto"
              placeholder="assigned"
            ></b-form-input>
          </b-form-group>
        </b-form>
        <!-- end of form -->
      </b-modal>
    <Home />
  </div>
</template>

<script>
import Home from './views/Home'
import db from '../config/firestore'
import Swal from "sweetalert2"
export default {
  name: 'App',
  components: {
    Home
  },
  data () {
    return {
      name: '',
      desc: '',
      assignedto: ''
    }
  },
  methods: {
    resetModal () {
      this.name = ''
      this.desc = ''
      this.assignedto = ''
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit () {
      db.collection('task').add({
        name: this.name,
        desc: this.desc,
        assignedto: this.assignedto,
        status: 'backlog'
      })
        .then((docRef) => {
          this.$nextTick(() => {
            this.$refs.modal.hide()
          })
          Swal.fire('success','sucessfully added','success')
        })
        .catch((error) => {
          console.log(error)
          this.$nextTick(() => {
            this.$refs.modal.hide()
          })
        })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.logo-kanban {
    width: 10vw;
}
</style>
