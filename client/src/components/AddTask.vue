<template>
  <div>
    <button class="btn btn-primary" type="button" disabled v-if="controll">
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      Loading...
    </button>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" v-if="!controll">
      Add Task
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <FormAdd @updateInput="updateInput" :controll="controll"/>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <!-- <b-button @click="makeToast('primary')" class="mb-2">Primary</b-button> -->
            <button type="button" class="btn btn-primary" @click="createTask" data-dismiss="modal">Add Task</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormAdd from '@/components/FormAdd.vue'
import db from '../configs/firestore'

export default {
  components: {
    FormAdd
  },
  data () {
    return {
      title: '',
      description: '',
      score: '',
      assignedTo: '',
      controll: false
    }
  },
  methods: {
    createTask () {
      if (!this.title || !this.description || !this.score || !this.assignedTo) {
        swal('Empty Input Detected', 'Please fill everything before add', 'error')
      }
      if (this.title.length < 6) {
        swal('Error Title minimum', 'Title minimum length is 6', 'error')
      } else {
        this.controll = true
        db.collection('tasks').add({
          title: this.title,
          description: this.description,
          score: this.score,
          assignedTo: this.assignedTo,
          status: 'backLog'
        })
          .then((docRef) => {
            this.controll = false
            console.log('Document written with ID: ', docRef.id)
          })
          .catch((error) => {
            this.controll = true
            console.error('Error adding document: ', error)
          })
      }
    },
    updateInput (obj) {
      this.title = obj.title,
      this.description = obj.description,
      this.score = obj.score,
      this.assignedTo = obj.assignedTo
    }
  }
}
</script>

<style>

</style>
