<template>
  <div class="container">
    <div class="home row">
      <!-- <div class="col-3">
        <BackLogCard />
      </div>
      <div class="col-3">
        <TodoCard />
      </div>
      <div class="col-3">
        <DoingCard />
      </div>
      <div class="col-3">
        <DoneCard />
      </div> -->
     <!-- <div class="col-3">
        <h3>Draggable 1</h3>
        <draggable class="list-group" :list="task1" group="people">
          <div
            class="list-group-item"
            v-for="(element) in task1"
            :key="element.name"
          >
            {{ element.name }}
          </div>
        </draggable>
      </div>

      <div class="col-3">
        <h3>Draggable 2</h3>
        <draggable class="list-group" :list="task2" group="people">
          <div
            class="list-group-item"
            v-for="(element) in task2"
            :key="element.name"
          >
            {{ element.name }}
          </div>
        </draggable>
      </div>

  <div class="col-3">
        <h3>Draggable 3</h3>
        <draggable class="list-group" :list="task3" group="people">
          <div
            class="list-group-item"
            v-for="(element) in task3"
            :key="element.name"
          >
            {{ element.name }}
          </div>
        </draggable>
      </div>

  <div class="col-3">
        <h3>Draggable 4</h3>
        <draggable class="list-group" :list="task4" group="people">
          <div
            class="list-group-item"
            v-for="(element) in task4"
            :key="element.name"
          >
            {{ element.name }}
          </div>
        </draggable>
      </div> -->
    <DragCard name='backlog' :list='task1' />
    <DragCard name='todo' :list='task2' />
    <DragCard name='doing' :list='task3' />
    <DragCard name='done' :list='task4'/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import BackLogCard from '@/components/BackLogCard.vue'
// import TodoCard from '@/components/TodoCard.vue'
// import DoingCard from '@/components/DoingCard.vue'
// import DoneCard from '../components/DoneCard.vue'
import DragCard from '../components/DragCard.vue'
import db from '../../config/firestore'


export default {
  name: "two-lists",
  display: "Two Lists",
  order: 1,
  components: {
    DragCard
  },
  data() {
    return {
      task1 : [],
      task2 : [],
      task3 : [],
      task4: []
    }
  },
  methods: {
    getdata() {
      db.collection ("task")
        .onSnapshot ((querySnapshot) => {
          let backlog = []
          let todo = []
          let doing = []
          let done = []
          querySnapshot.forEach (person => {
            console.log(person.data());
            let id = person.id
            let data = person.data()
            data.id = id
            if(data.status == 'backlog') {
              backlog.push(data)
            } else if (data.status == 'todo') {
              todo.push(data)
            } else if (data.status == 'doing') {
              doing.push(data)
            } else if (data.status == 'done') {
              done.push(data)
            }
          })
          this.task1 = backlog
          this.task2 = todo
          this.task3 = doing
          this.task4 = done
          console.log(this.task1,'task 1')
          console.log(this.task2,'task2')
          console.log(this.task3,'task3')
          console.log(this.task4,'task4')
          
      })
    }
  },
  created() {
    this.getdata()
  },
  watch: {
    task1 (val) {
      val.forEach (person =>{
        if(person.status !== 'backlog') {
          db.collection('task').doc(person.id).update({ status:'backlog' })
        }
      })
    },
    task2 (val) {
      val.forEach (person =>{
        if(person.status !== 'todo') {
          db.collection('task').doc(person.id).update({ status:'todo' })
        }
      })
    },
    task3 (val) {
      val.forEach (person =>{
        if(person.status !== 'doing') {
          db.collection('task').doc(person.id).update({ status:'doing' })
        }
      })
    },
    task4 (val) {
      val.forEach (person =>{
        if(person.status !== 'done') {
          db.collection('task').doc(person.id).update({ status:'done' })
        }
      })
    }
  }
}
</script>

<style scoped>
.task1 {
  background-color: red !important;
}
</style>