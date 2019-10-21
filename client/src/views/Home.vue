<template>
  <div class="row">
    <div class="col-sm">
      <Category>
        <template v-slot:header>
          <div class="card-header bg-danger">
            Back-Log
          </div>
        </template>
        <template v-slot:body>
          <Card v-for="task in backLog" :key="task.id" :task="task" @deleteTask="deleteTask" @updateStatus="updateStatus"/>
        </template>
      </Category>
    </div>
    <div class="col-sm">
      <Category>
        <template v-slot:header>
          <div class="card-header bg-info">
            To-Do
          </div>
        </template>
        <template v-slot:body>
          <Card v-for="task in toDo" :key="task.id" :task="task" @deleteTask="deleteTask" @updateStatus="updateStatus"/>
        </template>
      </Category>
    </div>
    <div class="col-sm">
      <Category>
        <template v-slot:header>
          <div class="card-header bg-primary">
            Doing
          </div>
        </template>
        <template v-slot:body>
          <Card v-for="task in doing" :key="task.id" :task="task" @deleteTask="deleteTask" @updateStatus="updateStatus"/>
        </template>
      </Category>
    </div>
    <div class="col-sm">
      <Category>
        <template v-slot:header>
          <div class="card-header bg-success">
            Done
          </div>
        </template>
        <template v-slot:body>
          <Card v-for="task in done" :key="task.id" :task="task" @deleteTask="deleteTask" @updateStatus="updateStatus"/>
        </template>
      </Category>
    </div>
  </div>
</template>

<script>
import db from '../configs/firestore'

import Category from '@/components/Category.vue'
import Card from '@/components/Card.vue'

// @ is an alias to /src
export default {
  name: 'home',
  components: {
    Category,
    Card
  },
  data () {
    return {
      tasks: [],
      backLog: [],
      toDo: [],
      doing: [],
      done: []
    }
  },
  created () {
    db.collection('tasks')
      .onSnapshot((tasks) => {
        let allTasks = []
        tasks.forEach(task => {
          let obj = {}
          obj.id = task.id
          obj.data = task.data()
          allTasks.push(obj)
        })
        this.tasks = allTasks
        this.backLogMethod()
        this.toDoMethod()
        this.doingMethod()
        this.doneMethod()
      })
  },
  methods: {
    deleteTask (id) {
      db.collection('tasks').doc(id).delete()
        .then(function () {
          console.log('Document successfully deleted!')
        })
        .catch(function (error) {
          console.error('Error removing document: ', error)
        })
    },
    updateStatus (id, status) {
      db.collection('tasks').doc(id).update('status', status)
        .then(function () {
        })
        .catch(function (error) {
          console.error('Error removing document: ', error)
        })
    },
    backLogMethod () {
      const backLog = []
      this.tasks.forEach(task => {
        if (task.data.status == 'backLog') {
          backLog.push(task)
        }
      })
      this.backLog = backLog
    },
    toDoMethod () {
      const toDo = []
      this.tasks.forEach(task => {
        if (task.data.status == 'toDo') {
          toDo.push(task)
        }
      })
      this.toDo = toDo
    },
    doingMethod () {
      const doing = []
      this.tasks.forEach(task => {
        if (task.data.status == 'doing') {
          doing.push(task)
        }
      })
      this.doing = doing
    },
    doneMethod () {
      const done = []
      this.tasks.forEach(task => {
        if (task.data.status == 'done') {
          done.push(task)
        }
      })
      this.done = done
    }
  }
}
</script>

<style scoped>
.col-sm{
  width: 25%;
  margin-top:20px
}
</style>
