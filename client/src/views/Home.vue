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
          <Card v-for="task in test" :key="task.id" :task="task.data"/>
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
          <Card v-for="task in tasks" :key="task.id" :task="task.data"/>
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
          <Card v-for="task in tasks" :key="task.id" :task="task.data"/>
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
          <Card v-for="task in tasks" :key="task.id" :task="task.data"/>
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
    Card,
  },
  data(){
    return{
      tasks: [],
      test: []
    }
  },
  created(){
    db.collection("tasks")
      .onSnapshot((tasks) => {
        let allTasks = []
        tasks.forEach(task=>{
          let obj = {}
          obj.id = task.id
          obj.data = task.data()
          allTasks.push(obj)
        })
        this.tasks = allTasks
        this.testSaja()
      });
  },
  methods:{
    testSaja(){
      const test= []
      
      this.tasks.forEach(task=>{
        if(task.data.title == 'yesbenar'){
          test.push(task)
        }
      })
      this.test = test
      console.log(this.test);
      
    },
    backLog(){
      const backLog = []
      this.tasks.forEach(task=>{
        if(task.status == 'backLog'){
          backLog.push(task)
        }
      })
    },
    toDo(){
      const toDo = []
      this.tasks.forEach(task=>{
        if(task.status == 'toDo'){
          toDo.push(task)
        }
      })
    },
    doing(){
      const doing = []
      this.tasks.forEach(task=>{
        if(task.status == 'doing'){
          doing.push(task)
        }
      })
    },
    done(){
      const done = []
      this.tasks.forEach(task=>{
        if(task.status == 'done'){
          done.push(task)
        }
      })
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
