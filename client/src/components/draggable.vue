<template>
    <div class="container">
        <div class="row hp">
            <dragcomponent name='Backlog' :list='list1' />
            <dragcomponent name='To-do' :list='list2' />
            <dragcomponent name='Doing' :list='list3' />
            <dragcomponent name='Done' :list='list4' />
        </div>
    </div>
</template>

<script>
import db from '../config/firestore'
import dragcomponent from './dragcomponent'

export default {
  name: 'two-lists',
  display: 'Two Lists',
  order: 1,
  components: {
    dragcomponent
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
    getdata () {
      db.collection('kanban')
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
          this.list1 = backlog
          this.list2 = todo
          this.list3 = doing
          this.list4 = done
        })
    }
  },
  watch: {
    list1 (val) {
      val.forEach(person => {
        if (person.status !== 'backlog') {
          db.collection('kanban').doc(person.id).update({ status: 'backlog' })
        }
      })
    },
    list2 (val) {
      val.forEach(person => {
        if (person.status !== 'todo') {
          db.collection('kanban').doc(person.id).update({ status: 'todo' })
        }
      })
    },
    list3 (val) {
      val.forEach(person => {
        if (person.status !== 'doing') {
          db.collection('kanban').doc(person.id).update({ status: 'doing' })
        }
      })
    },
    list4 (val) {
      val.forEach(person => {
        if (person.status !== 'done') {
          db.collection('kanban').doc(person.id).update({ status: 'done' })
        }
      })
    }
  },
  created () {
    this.getdata()
  }
}
</script>

<style>
.hp {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
}
</style>
