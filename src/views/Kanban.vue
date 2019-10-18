<template>
  <div>
    <Navbar class="mb-4" @dataFromForm="addData"/>

  <p class="text-center">This application is realtime and has a drag and drop feature!</p>

    <b-container fluid class="">

      <b-row>

        <CardPlace :dataArray="masterData.list1" :variant="'danger'" :header="'Back-log'">
          <Card v-for="(data,index) in masterData.list1" :key="index" :data="data"></Card>
        </CardPlace>

        <CardPlace :dataArray="masterData.list2" :variant="'warning'" :header="'To-Do'">
          <Card v-for="(data2,index2) in masterData.list2" :key="index2" :data="data2"></Card>
        </CardPlace>

        <CardPlace :dataArray="masterData.list3" :variant="'primary'" :header="'Doing'">
          <Card v-for="(data3,index3) in masterData.list3" :key="index3" :data="data3"></Card>
        </CardPlace>

        <CardPlace :dataArray="masterData.list4" :variant="'success'" :header="'Done'">
          <Card v-for="(data4,index4) in masterData.list4" :key="index4" :data="data4"></Card>
        </CardPlace>


      </b-row>
    </b-container>
  </div>
</template>

<script>
import CardPlace from '@/components/CardPlace.vue'
import Card from '@/components/Card.vue'
import draggable from 'vuedraggable'
import Navbar from '@/components/Navbar.vue'
import Swal from 'sweetalert2'
import db from '../api/firebase'
const task = db.collection('backlog')

export default {
  name: 'kanban',
  components: {
    draggable,
    Navbar,
    Card,
    CardPlace
  },
  data () {
    return {
      masterData:{
        list1: [],
        list2: [],
        list3: [],
        list4: []
      }
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
        this.masterData.list1 = []
        this.masterData.list2 = []
        this.masterData.list3 = []
        this.masterData.list4 = []
        doc.docs.forEach(el => {
          let id = el.id
          let data = el.data()
          data.id = id
          if (el.data().status === 'backlog') {
            this.masterData.list1.push(data)
          } else if (el.data().status === 'todo') {
            this.masterData.list2.push(data)
          } else if (el.data().status === 'doing') {
            this.masterData.list3.push(data)
          } else if (el.data().status === 'done') {
            this.masterData.list4.push(data)
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
    'masterData.list1' () {
      for (let i = 0; i < this.masterData.list1.length; i++) {
        if (this.masterData.list1[i].status !== 'backlog') {
          task.doc(`${this.masterData.list1[i].id}`).update({
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
  'masterData.list2' () {
      for (let i = 0; i < this.masterData.list2.length; i++) {
        if (this.masterData.list2[i].status !== 'todo') {
          task.doc(`${this.masterData.list2[i].id}`).update({
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
  'masterData.list3' () {
      for (let i = 0; i < this.masterData.list3.length; i++) {
        if (this.masterData.list3[i].status !== 'doing') {
          task.doc(`${this.masterData.list3[i].id}`).update({
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
    'masterData.list4' () {
      for (let i = 0; i < this.masterData.list4.length; i++) {
        if (this.masterData.list4[i].status !== 'done') {
          task.doc(`${this.masterData.list4[i].id}`).update({
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
