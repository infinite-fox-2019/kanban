<template>
  <div>

    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="#" variant="light"><strong>KanBan</strong></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-button size="sm" class="my-2 my-sm-0" variant="light">Create Task</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-container class="mt-5">
      <b-row>
        <b-col v-for="(list, index) in status" :key="index" :id="index">
          <Cardstatus :title="index" :list="list"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import db from '../../config/firestore'
import Cardstatus from '@/components/Cardstatus.vue'

export default {
  name: 'kanban',
  components: {
    Cardstatus
  },
  data () {
    return {
      status: {
        backlog: [],
        todo: [],
        doing: [],
        done: []
      }
    }
  },
  methods: {
    fetchTask: function () {
      db
        .collection('tasks')
        .onSnapshot((querySnapshot) => {
          let arrBackLog = []
          let arrTodo = []
          let arrDoing = []
          let arrDone = []
          querySnapshot.docs.forEach(task => {
            let taskObj
            switch (task.data().status) {
              case 'backlog':
                taskObj = task.data()
                taskObj.id = task.id
                arrBackLog.push(taskObj)
                break
              case 'todo':
                taskObj = task.data()
                taskObj.id = task.id
                arrTodo.push(taskObj)
                break
              case 'doing':
                taskObj = task.data()
                taskObj.id = task.id
                arrDoing.push(taskObj)
                break
              case 'done':
                taskObj = task.data()
                taskObj.id = task.id
                arrDone.push(taskObj)
                break
            }
          })
          this.status.backlog = arrBackLog
          this.status.todo = arrTodo
          this.status.doing = arrDoing
          this.status.done = arrDone
        })
    }
  },
  computed: {
    backlog () {
      return this.status.backlog
    },
    todo () {
      return this.status.todo
    },
    doing () {
      return this.status.doing
    },
    done () {
      return this.status.done
    }
  },
  watch: {
    backlog: function () {
      // console.log('backlog')
      this.status.backlog.forEach(task => {
        if (task.status !== 'backlog') {
          db
            .collection('tasks')
            .doc(task.id)
            .update({
              status: 'backlog'
            })
        }
      })
    },
    todo: function () {
      // console.log('todo')
      this.status.todo.forEach(task => {
        if (task.status !== 'todo') {
          db
            .collection('tasks')
            .doc(task.id)
            .update({
              status: 'todo'
            })
        }
      })
    },
    doing: function () {
      // console.log('doing')
      this.status.doing.forEach(task => {
        if (task.status !== 'doing') {
          db
            .collection('tasks')
            .doc(task.id)
            .update({
              status: 'doing'
            })
        }
      })
    },
    done: function () {
      // console.log('done')
      this.status.done.forEach(task => {
        if (task.status !== 'done') {
          db
            .collection('tasks')
            .doc(task.id)
            .update({
              status: 'done'
            })
        }
      })
    }
  },
  created () {
    this.fetchTask()
  }
}
</script>

<style>

</style>
