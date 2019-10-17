<template>
  <div>
    <Navbar class="mb-4" @dataFromForm="addData"/>

  <p class="text-center">This application is realtime and has a drag and drop feature!</p>

    <b-container fluid class="">

      <b-row>

        <b-col md="3" class="mb-3">
          <b-card bg-variant="danger" text-variant="white" header="Back-Log" class="text-center">
            <draggable :list="list1" group="kanban">

              <b-card v-for="(data, index) in list1" :key="index" style="color:black" :header="data.title" class="text-center mb-3">
                <b-card-text>{{data.description}}</b-card-text>
                <b-button variant="danger"  @click.prevent="deleteData(data.id)">Delete</b-button>
              </b-card>

            </draggable>
          </b-card>
        </b-col>

        <b-col md="3" class="mb-3">
          <b-card bg-variant="warning" text-variant="white" header="To-Do" class="text-center">
            <draggable :list="list2"  group="kanban">

              <b-card v-for="(data, index) in list2" :key="index" style="color:black" :header="data.title" class="text-center mb-3">
                <b-card-text>{{data.description}}</b-card-text>
                <b-button variant="danger" @click.prevent="deleteData(data.id)">Delete</b-button>
              </b-card>

            </draggable>
          </b-card>
        </b-col>

        <b-col md="3" class="mb-3">
          <b-card bg-variant="primary" text-variant="white" header="Doing" class="text-center">
            <draggable :list="list3"  group="kanban">

              <b-card v-for="(data, index) in list3" :key="index" style="color:black" :header="data.title" class="text-center mb-3">
                <b-card-text>{{data.description}}</b-card-text>
                <b-button variant="danger" @click.prevent="deleteData(data.id)">Delete</b-button>
              </b-card>

            </draggable>
          </b-card>
        </b-col>

        <b-col md="3" class="mb-3">
          <b-card bg-variant="success" text-variant="white" header="Done" class="text-center">
            <draggable :list="list4"  group="kanban">

              <b-card v-for="(data, index) in list4" :key="index" style="color:black" :header="data.title" class="text-center mb-3">
                <b-card-text>{{data.description}}</b-card-text>
                <b-button variant="danger" @click.prevent="deleteData(data.id)">Delete</b-button>
              </b-card>

            </draggable>
          </b-card>
        </b-col>

      </b-row>
    </b-container>
  </div>
</template>

<script>
// import CardPlace from '@/components/CardPlace.vue'
import draggable from 'vuedraggable'
import Navbar from '@/components/Navbar.vue'
import Swal from 'sweetalert2'
import db from '../api/firebase'
const task = db.collection('backlog')

export default {
  name: 'kanban',
  components: {
    draggable,
    Navbar
  },
  data () {
    return {
      list1: [],
      list2: [],
      list3: [],
      list4: []
    }
  },
  methods: {
    addData (title, description, status) {
      task.add({ title, description, status, createdAt: new Date() })
        .then(function () {
          console.log('Document successfully written!')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    },
    deleteData (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          task.doc(`${id}`).delete().then(function () {
            console.log('Document successfully deleted!')
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }).catch(function (error) {
            console.error('Error removing document: ', error)
            Swal.fire(
              'Awww!',
              'Somethin wrong. Please try again later.',
              'error'
            )
          })
        }
      })

      task.doc(`${id}`).delete().then(function () {
        console.log('Document successfully deleted!')
      }).catch(function (error) {
        console.error('Error removing document: ', error)
      })
    },
    fetchData () {
      Swal.showLoading()
      task.orderBy('createdAt', 'desc').onSnapshot((doc) => {
        this.list1 = []
        this.list2 = []
        this.list3 = []
        this.list4 = []
        doc.docs.forEach(el => {
          let id = el.id
          let data = el.data()
          data.id = id
          if (el.data().status === 'backlog') {
            this.list1.push(data)
          } else if (el.data().status === 'todo') {
            this.list2.push(data)
          } else if (el.data().status === 'doing') {
            this.list3.push(data)
          } else if (el.data().status === 'done') {
            this.list4.push(data)
          }
          Swal.close()
        })
      })
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    list1 () {
      for (let i = 0; i < this.list1.length; i++) {
        if (this.list1[i].status !== 'backlog') {
          task.doc(`${this.list1[i].id}`).update({
            status: 'backlog'
          })
            .then(function () {
              console.log('Document successfully updated!')
            })
            .catch(function (error) {
              console.error('Error updating document: ', error)
            })
        }
      }
    },
    list2 () {
      for (let i = 0; i < this.list2.length; i++) {
        if (this.list2[i].status !== 'todo') {
          task.doc(`${this.list2[i].id}`).update({
            status: 'todo'
          })
            .then(function () {
              console.log('Document successfully updated!')
            })
            .catch(function (error) {
              console.error('Error updating document: ', error)
            })
        }
      }
    },
    list3 () {
      for (let i = 0; i < this.list3.length; i++) {
        if (this.list3[i].status !== 'doing') {
          task.doc(`${this.list3[i].id}`).update({
            status: 'doing'
          })
            .then(function () {
              console.log('Document successfully updated!')
            })
            .catch(function (error) {
              console.error('Error updating document: ', error)
            })
        }
      }
    },
    list4 () {
      for (let i = 0; i < this.list4.length; i++) {
        if (this.list4[i].status !== 'done') {
          task.doc(`${this.list4[i].id}`).update({
            status: 'done'
          })
            .then(function () {
              console.log('Document successfully updated!')
            })
            .catch(function (error) {
              console.error('Error updating document: ', error)
            })
        }
      }
    }
  }
}
</script>

<style  scoped>

</style>
