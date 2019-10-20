<template>
  <div>
    <draggable
      v-model="tasks[status]"
      group="tasks"
      @start="isDragging = true"
      @end="isDragging = false"
    >
      <template>
        <b-card
          class="card"
          v-for="task in tasks[status]"
          :key="task.id"
          :title="task.title"
          align="left"
        >
          <hr />
          <b-card-text>Description: {{ task.description }}</b-card-text>
          <b-card-text>Point: {{ task.point }}</b-card-text>
          <b-card-text>Assign To: {{ task.assignTo }}</b-card-text>
          <hr />
          <div align="center">
            <span>
              <b-button
                v-if="task.status === 'todo'"
                disabled
                @click="moveStat(task.id, 'todo')"
                style="width:15%"
                class="ml-4 mr-4"
                size="sm"
                href="#"
                variant="primary"
              >
                <i class="fas fa-arrow-circle-left"></i>
              </b-button>
              <b-button
                v-else
                @click="moveStat(task.id, 'todo')"
                style="width:15%"
                class="ml-4 mr-4"
                size="sm"
                href="#"
                variant="primary"
              >
                <i class="fas fa-arrow-circle-left"></i>
              </b-button>
            </span>|
            <b-button
              @click="deleteDoc(task.id)"
              style="width:15%"
              class="ml-4 mr-4"
              size="sm"
              href="#"
              variant="danger"
            >
              <i class="fas fa-trash"></i>
            </b-button>|
            <span>
            <b-button v-if="task.status !== 'done'"
              @click="moveStat(task.id, 'doing')"
              style="width:15%"
              class="ml-4 mr-4"
              size="sm"
              href="#"
              variant="primary"
            >
              <i class="fas fa-arrow-circle-right"></i>
            </b-button>
            <b-button v-else disabled=""
              @click="moveStat(task.id, 'doing')"
              style="width:15%"
              class="ml-4 mr-4"
              size="sm"
              href="#"
              variant="primary"
            >
              <i class="fas fa-arrow-circle-right"></i>
            </b-button>
            </span>
          </div>
        </b-card>
      </template>
    </draggable>
  </div>
</template>

<script>
import db from '../../config/firestore.js'
import Swal from 'sweetalert2'
import draggable from 'vuedraggable'

export default {
  name: 'SubCard',
  props: ['status', 'tasks'],
  components: {
    draggable
  },
  data () {
    return {
      isDragging: false,
      controlOnStart: true
    }
  },
  methods: {
    deleteDoc (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then(result => {
          if (result.value) {
            db.collection('Task')
              .doc(id)
              .delete()
              .then(function () {
                Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
              })
              .catch(function (error) {
                console.error('Error removing document: ', error)
              })
          }
        })
        .catch(function (error) {
          console.error('Error removing document: ', error)
        })
    },
    moveStat (id, newStatus) {
      Swal.fire({
        title: 'Are you sure?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, move it!'
      })
        .then(result => {
          if (result.value) {
            var taskRef = db.collection('Task').doc(id)
            taskRef.set(
              {
                status: newStatus
              },
              { merge: true }
            )
          }
          Swal.fire('Moved!', 'Your file has been moved.', 'success')
        })
        .catch(function (error) {
          console.error('Error removing document: ', error)
        })
    }
  },
  watch: {
    'tasks.todo' () {
      for (let i = 0; i < this.tasks.todo.length; i++) {
        if (this.tasks.todo[i].status !== 'todo') {
          db.collection('Task').doc(`${this.tasks.todo[i].id}`).update({
            status: 'todo'
          })
            .then(function () {
              console.log('Document successfully updated!')
            })
        }
      }
    },
    'tasks.doing' () {
      for (let i = 0; i < this.tasks.doing.length; i++) {
        if (this.tasks.doing[i].status !== 'doing') {
          db.collection('Task').doc(`${this.tasks.doing[i].id}`).update({
            status: 'doing'
          })
            .then(function () {
              console.log('Document successfully updated!')
            })
        }
      }
    },
    'tasks.done' () {
      for (let i = 0; i < this.tasks.done.length; i++) {
        if (this.tasks.done[i].status !== 'done') {
          db.collection('Task').doc(`${this.tasks.done[i].id}`).update({
            status: 'done'
          })
            .then(function () {
              console.log('Document successfully updated!')
            })
        }
      }
    }
  }
}
</script>
<style scoped>
.card {
  margin-top: 5px;
}
</style>
