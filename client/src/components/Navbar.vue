<template>
    <div>
        <b-navbar class="nav-bar" toggleable="lg" variant="light">
            <h2 class="ml-5" href="#">NavBar</h2>
            <b-navbar-nav class="ml-auto">
                <b-nav-form>
                <b-button v-b-modal.modal-lg @click.prevent="addTask" variant="primary" size="md" class="my-2 mr-5" type="submit">Add New Task</b-button>
                </b-nav-form>
                <div >
                <ModalAddTask></ModalAddTask>
                </div>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
import ModalAddTask from './form/addTask.vue'

export default {
  name: 'NavBar',
  components: {
    ModalAddTask
  },
  data () {
    return {
      modalAddTask: false,
      title: '',
      description: '',
      point: '',
      assignTo: '',
      status: 'toDo'
    }
  },
  methods: {
    addTask () {
      this.modalAddTask = true
    }
  }
}
</script>

<style scoped>
.nav-bar {
    padding : 10px;
}
</style>
