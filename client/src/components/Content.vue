<template>
  <div class="card col-xl-2 col-lg-4 col-md-4 col-sm-4 m-3" style="padding : 0;">
    <div class="card-header" :style="{'background-color' : this.color}">
      <strong>{{this.name}}</strong>
    </div>
    <div class="card-body">
      <div
        v-for="(kanban , index) in kanGaban"
        :key="kanban.id + index + kanban.name + Math.floor(Math.random() * 99)"
      >
        <draggable
          group="kanban"
          @start="drag=true"
          @end="drag=false; dragKanGaban($event , kanban)"
          @change="dragKanGaban($event , kanban)"
        >
          <div class="card mt-3" v-if="kanban.status == name">
            <div>
              <div class="card-header">
                <h5>
                  <strong>{{kanban.title}}</strong>
                </h5>
              </div>
              <div class="card-body d-flex flex-column align-items-start">
                <div class="p-1">
                  <p class="card-text">Description: {{kanban.description}}</p>
                </div>
                <div class="p-1">
                  <button class="btn btn-danger" @click="deleteGaban(kanban.id)">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../views/db'
import draggable from 'vuedraggable'
import firebase from 'firebase'
export default {
  props: ['name', 'color', 'kanGabans'],
  created () {
    db.collection('kanban')
      .orderBy('createdAt', 'desc')
      .onSnapshot(doc => {
        this.kanGaban = []
        doc.forEach(el => {
          console.log(el.data().status, this.name, el.id)
          let obj = { ...el.data(), id: el.id }
          this.kanGaban.push(obj)
        })
        console.log(this.kanGaban)
      })
  },
  data () {
    return {
      kanGaban: [],
      tes: ''
    }
  },
  components: {
    draggable
  },
  methods: {
    deleteGaban (id) {
      db.collection('kanban')
        .doc(id)
        .delete()
        .then(function () {
          console.log('Document successfully deleted!')
        })
        .catch(function (error) {
          console.error('Error removing document: ', error)
        })
    },
    handleChange () {
      console.log('changed')
    },
    start (tes) {
      return tes
    },
    dragKanGaban (name, kanban) {
      let{ id, title, description } = kanban
      db.collection('kanban')
        .doc(id)
        .set(
          {
            title,
            description,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            status: name.to.offsetParent.lastElementChild.offsetParent.innerText.split(
              '\n'
            )[0]
          },
          { merge: true }
        )
        .then(function () {
          console.log('Document successfully written!')
        })
        .catch(function (error) {
          console.error(error)
        })
    }
  },
  watch: {
    tes: function (val) {
      console.log(val)
    }
  }
}
</script>

<style>
</style>
