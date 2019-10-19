<template>
  <div class="container">
    <div class="home row">
    <DragCard name='BACKLOG' :list='task1' />
    <DragCard name='TODO' :list='task2' />
    <DragCard name='DOING' :list='task3' />
    <DragCard name='DONE' :list='task4'/>
    </div>
  </div>
</template>

<script>
import DragCard from '../components/DragCard.vue'
import db from '../../config/firestore'

export default {
  name: 'two-lists',
  display: 'Two Lists',
  order: 1,
  components: {
    DragCard
  },
  data () {
    return {
      task1: [],
      task2: [],
      task3: [],
      task4: []
    }
  },
  methods: {
    getdata () {
      db.collection('task')
        .onSnapshot((querySnapshot) => {
          let backlog = []
          let todo = []
          let doing = []
          let done = []
          querySnapshot.forEach(person => {
            let id = person.id
            let data = person.data()
            data.id = id
            if (data.status === 'backlog') {
              backlog.push(data)
            } else if (data.status === 'todo') {
              todo.push(data)
            } else if (data.status === 'doing') {
              doing.push(data)
            } else if (data.status === 'done') {
              done.push(data)
            }
          })
          this.task1 = backlog
          this.task2 = todo
          this.task3 = doing
          this.task4 = done
        })
    }
  },
  created () {
    this.getdata()
  },
  watch: {
    task1 (val) {
      val.forEach(person => {
        if (person.status !== 'backlog') {
          db.collection('task').doc(person.id).update({ status: 'backlog' })
        }
      })
    },
    task2 (val) {
      val.forEach(person => {
        if (person.status !== 'todo') {
          db.collection('task').doc(person.id).update({ status: 'todo' })
        }
      })
    },
    task3 (val) {
      val.forEach(person => {
        if (person.status !== 'doing') {
          db.collection('task').doc(person.id).update({ status: 'doing' })
        }
      })
    },
    task4 (val) {
      val.forEach(person => {
        if (person.status !== 'done') {
          db.collection('task').doc(person.id).update({ status: 'done' })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
