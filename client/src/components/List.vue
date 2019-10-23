<template>
  <div>
    <modal @addTask="addNewTask"></modal>
      <div class="text-center">
        <a href="" class="btn btn-default btn-rounded mb-4" data-toggle="modal" data-target="#modalLoginForm">Add new task</a>
      </div>
    <div class="container">
      <div v-for="category in categories" :key="category.name" class="categories">
          <div class="flex justify-center title" :style="{backgroundColor: category.color}">
            <h5>{{ category.title }}</h5>
          </div>
          <div class="flex flex-column items-center items">
            <draggable v-model="category.tasks" group="works" @start="drag=true" @end="drag=false">
              <card v-for="item in category.tasks" :key="item.id" :task="item" :color="category.color" :status="category.name"></card>
            </draggable>
            <div>
            </div>
          </div>
      </div>
    </div>
  </div>

</template>

<script>
import draggable from 'vuedraggable'
import card from './Card'
import modal from './Modal'
import db from '../config/firestore'
export default {
  components: { draggable, card, modal },
  data () {
    return {
      categories: [
        {
          name: 'todo',
          title: 'To Do',
          color: 'orange',
          tasks: []
        },
        {
          name: 'progress',
          title: 'On Progress',
          color: 'lightblue',
          tasks: []
        },
        {
          name: 'review',
          title: 'Need Review',
          color: 'yellow',
          tasks: []
        },
        {
          name: 'done',
          title: 'Done',
          color: 'lightgreen',
          tasks: []
        }

      ]
    }
  },
  methods: {
    addNewTask (newTask) {
      this.categories[0].tasks.unshift(newTask)

      db.collection('tasks').add(newTask)
        .then(function (docRef) {
          console.log(`Document written with ID ${docRef.id}`)
        })
        .catch(console.log)
    },
    readData () {
      db.collection('tasks')
        .onSnapshot((querySnapshot) => {
          this.categories.forEach(category => {
            category.tasks = []
          })
          querySnapshot.forEach((doc) => {
            let index = this.categories.findIndex(cat => cat.name === doc.data().status)
            const payload = { id: doc.id, ...doc.data() }
            this.categories[index].tasks.push(payload)
          })
        })
    }
  },
  watch: {
    categories: {
      handler (newVal, oldVal) {
        newVal.forEach(category => {
          category.tasks.forEach(task => {
            if (category.name !== task.status) {
              db.collection('tasks').doc(task.id).update({ status: category.name })
            }
          })
        })
      },
      deep: true
    }
  },
  created () {
    this.readData()
  }
}
</script>

<style>
  .container {
    display: flex;
    flex-wrap: wrap;
    min-height: 70vh;
    margin: 0 auto;

  }
  .categories {
    width: 25%;
  }
  .items {
    min-height: 25vh;
    padding: 10px;
    margin: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .title {
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  @media only screen and (max-width: 800px) {
    .categories {width: 50%; margin-bottom: 10px;} 
  }
  @media only screen and (max-width: 600px) {
    .categories {width: 100%; margin-bottom: 10px;}
  }

</style>
