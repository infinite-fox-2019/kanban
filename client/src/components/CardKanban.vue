<template>
  <div class="card">
    <div class="close">
      <v-btn text small  @click="deleteMe">
        <v-icon style="color: white">fa-times</v-icon>
      </v-btn>
    </div>
    <div>
      <h4 name="title">Title :</h4>
      <p>{{title}}</p>
      <h4>Description :</h4>
      <p>{{description}}</p>
      <h4>Assign To :</h4>
      <p>{{assignTo}}</p>
      <h4>Created At :</h4>
      <p>{{new Date(createdAt.seconds * 1000).toDateString()}}</p>
      <div class="button">
        <v-btn v-if="status !== 'back-log'" color="#fcccd4" @click="updateBackward">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn v-if="status !== 'done'" color="#c8abd8" @click="updateForward">
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
// import db from '../api/firebase.js'
import db from '@/api/firestore'
export default {
  data () {
    return {}
  },
  props: {
    id: String,
    title: String,
    description: String,
    assignTo: String,
    status: String,
    createdAt: Object
  },
  methods: {
    updateForward () {
      let changeTo = ''
      if (this.status === 'back-log') {
        changeTo = 'todo'
      } else if (this.status === 'todo') {
        changeTo = 'in-progress'
      } else if (this.status === 'in-progress') {
        changeTo = 'done'
      }
      let changes = {
        id: this.id,
        status: changeTo
      }
      this.changeThis(changes)
    },
    updateBackward () {
      let changeTo = ''
      if (this.status === 'done') {
        changeTo = 'in-progress'
      } else if (this.status === 'in-progress') {
        changeTo = 'todo'
      } else if (this.status === 'todo') {
        changeTo = 'back-log'
      }
      let changes = {
        id: this.id,
        status: changeTo
      }
      this.changeThis(changes)
    },
    changeThis (input) {
      let { id, status } = input
      // console.log(id);
      db.collection('kanban')
        .doc(id)
        .update({
          status
        })
        .then(response => {
          // console.log(response);
          // console.log(response.data);
        })
    },
    deleteMe () {
      Swal.fire({
        html: `<p>This will be deleted immediately you can't undo</p>`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#8D249E',
        cancelButtonColor: '#EC366F',
        confirmButtonText: 'Delete it!'
      })
        .then(result => {
          if (result.value === true) {
            db.collection('kanban')
              .doc(this.id)
              .delete()
              .then(response => {
                Swal.fire({
                  html: '<p>Success Delete</p>',
                  type: 'success',
                  confirmButtonColor: '#9C28B0',
                  animation: false,
                  customClass: {
                    popup: 'animated bounce'
                  }
                })
              })
          } else if (result.dismiss === 'cancel') {
            Swal.fire({
              html: '<p>Cancel Deletion</p>',
              type: 'info',
              confirmButtonColor: '#9C28B0',
              animation: false,
              customClass: {
                popup: 'animated bounce'
              }
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.card {
  width: 250px;
  min-height: 145px;
  border: 1.5px solid rgb(92, 80, 80);
  margin-bottom: 30px;
  background: white
}
.close {
  width: 248px;
  height: 25px;
  background: rgb(92, 86, 86);
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
p {
  text-align: center;
  color: black;
  font-size: 11pt;
  margin-left: 12px;
  margin-right: 12px;
}
h4 {
  color: rgb(32, 28, 28);
  text-align: center;
  font-size: 12.5pt;
}
h4[name="title"] {
  margin-top: 15px;
}
.button {
  display: flex;
  justify-content: space-around;
  margin: 10% 20% 10% 20%;
}
</style>
