<template>
    <div class="d-flex">
      <div v-for="category in categories" :key="category.name" class="card mx-2" style="width: 20rem;">
        <div class="card-header" :style="{backgroundColor: category.color, color: 'white'}">
            <strong> {{ category.title }} </strong>
        </div>
        <div class="card-body" style="height: auto" >
          <draggable v-model="category.tasks" group="todo" @start="drag=true" @end="drag=false">
            <Task v-for="element in category.tasks" :key="element.id" :task="element"></Task>
          </draggable>
        </div>
      </div>
    </div>
</template>

<script>
import Task from './Task'
import draggable from 'vuedraggable'
import Swal from 'sweetalert2'
import db from '@/config/firebase'
const tasksCollection = db.collection('tasks')

export default {
  name: 'Category',
  components: { Task, draggable },
  data () {
    return {
      categories: [
        {
          name: 'backlog',
          title: 'Backlog',
          color: 'orange',
          tasks: []
        },
        {
          name: 'todo',
          title: 'Todo',
          color: 'darkblue',
          tasks: []
        },
        {
          name: 'doing',
          title: 'Doing',
          color: 'red',
          tasks: []
        },
        {
          name: 'done',
          title: 'Done',
          color: 'green',
          tasks: []
        }
      ]
    }
  },
  watch: {
    categories: {
      deep: true,
      handler (newVal, oldVal) {
        console.log('categories has changed!')
        console.log(newVal)
        newVal.forEach(category => {
          category.tasks.forEach(task => {
            if (category.name !== task.status) {
              tasksCollection.doc(task.id).update({
                status: category.name
              })
            }
          })
        })
      }
    }
  },
  created () {
    Swal.showLoading()
    tasksCollection.onSnapshot((querySnapshot) => {
      this.categories.forEach(category => {
        category.tasks = []
        Swal.close()
      })
      querySnapshot.forEach(doc => {
        const status = doc.data().status
        const index = this.categories.findIndex(el => el.name === status)
        const payload = {
          id: doc.id,
          ...doc.data()
        }

        this.categories[index].tasks.push(payload)
      })
    })
  }
}
</script>
