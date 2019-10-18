<template>
  <div class="home">
    <navbar />
    <div id="boards">
      <backlog :deleteTask="deleteTask" :backloglist="backloglist" />
      <todo :deleteTask="deleteTask" :todolist="todolist" />
      <doing :deleteTask="deleteTask" :doinglist="doinglist" />
      <done :deleteTask="deleteTask" :donelist="donelist" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import navbar from '../components/navbar'
import backlog from '../components/backlogBoard'
import todo from '../components/todoBoard'
import doing from '../components/doingBoard'
import done from '../components/doneBoard'
import db from '../../config/firebase'
const task = db.collection('kanban')

export default {
  name: 'home',
  data () {
    return {
      backloglist: [],
      todolist: [],
      doinglist: [],
      donelist: []
    }
  },
  components: {
    navbar,
    backlog,
    todo,
    doing,
    done
  },
  methods: {
    deleteTask (id) {
      task.doc(`${id}`).delete()
        .then(() => {
          console.log('Document successfully deleted!')
        })
        .catch(err => {
          console.error('Error removing document: ', err)
        })
    },
    getBacklog () {
      db.collection('kanban').where('status', '==', 'backlog')
        .onSnapshot(querySnapshot => {
          let temp = []
          querySnapshot.forEach(doc => {
            let data = doc.data()
            data.id = doc.id
            temp.push(data)
          })
          this.backloglist = temp
          console.log('getBacklog => ', this.backloglist)
        })
    },

    getTodo () {
      db.collection('kanban').where('status', '==', 'todo')
        .onSnapshot(querySnapshot => {
          let temp = []
          querySnapshot.forEach(doc => {
            let data = doc.data()
            data.id = doc.id
            temp.push(data)
          })
          this.todolist = temp
          console.log('getTodo => ', this.todolist)
        })
    },

    getDoing () {
      db.collection('kanban').where('status', '==', 'doing')
        .onSnapshot(querySnapshot => {
          let temp = []
          querySnapshot.forEach(doc => {
            let data = doc.data()
            data.id = doc.id
            temp.push(data)
          })
          this.doinglist = temp
          console.log('getDoing => ', this.doinglist)
        })
    },

    getDone () {
      db.collection('kanban').where('status', '==', 'done')
        .onSnapshot(querySnapshot => {
          let temp = []
          querySnapshot.forEach(doc => {
            let data = doc.data()
            data.id = doc.id
            temp.push(data)
          })
          this.donelist = temp
          console.log('getDone => ', this.donelist)
        })
    }
  },
  created () {
    this.getBacklog()
    this.getTodo()
    this.getDoing()
    this.getDone()
  },
  watch: {
    backloglist (val) {
      val.forEach(el => {
        if (el.status !== 'backlog') {
          db.collection('kanban').doc(el.id).update({ status: 'backlog' })
        }
      })
    },

    todolist (val) {
      val.forEach(el => {
        if (el.status !== 'todo') {
          db.collection('kanban').doc(el.id).update({ status: 'todo' })
        }
      })
    },

    doinglist (val) {
      val.forEach(el => {
        if (el.status !== 'doing') {
          db.collection('kanban').doc(el.id).update({ status: 'doing' })
        }
      })
    },

    donelist (val) {
      val.forEach(el => {
        if (el.status !== 'done') {
          db.collection('kanban').doc(el.id).update({ status: 'done' })
        }
      })
    }
  }
}
</script>

<style>
#boards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

}
</style>
