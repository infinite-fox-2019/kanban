<template>
<div>
  <b-navbar  type="dark" variant="info">
    <router-link to="/"><img src="http://pluspng.com/img-png/pic-home-address-symbol-png-image-206-512.png" class="d-inline-block align-top" width="30" height="30" alt=""></router-link>
    <b-navbar-nav class="ml-auto">
    <b-button variant="success" class="my-2 my-sm-0" type="submit" right @click="modalShow = !modalShow">Add To Do</b-button>
    </b-navbar-nav>
  </b-navbar>
  
   <div>
    <b-modal v-model="modalShow">
      <h4>Input Todo</h4>
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <div class="form-group">
          <label for="input">Name: </label>
          <input v-model="name" id="name" class="form-control" />
          <label for="input">To Do: </label>
          <input v-model="todo" id="todo" class="form-control" />
        </div>  
      </form>
    </b-modal>
  </div>
  
  <div class="about">
    <div class="row p-5">
      <CardKanban v-for="(data, index) in taskLists" :key="index" :data="data"></CardKanban>
    </div>
  </div>
</div>
</template>

<script>
import CardKanban from "@/components/Card";
import database from '../assets/config/firebase.js'

const taskData = [
  {
    name: 'To-Do',
    data: []
  },
  {
    name: 'On-Going',
    data: []
  },
  {
    name: 'Finished',
    data: []
  }
]
var leadsRef = database.ref('/')
leadsRef.on('value', function (snapshot) {
  taskData[0].data = []
  taskData[1].data = []
  taskData[2].data = []
  snapshot.forEach(function (childSnapshot) {
     if (childSnapshot.val().status === 'To-Do') {
      const obj = childSnapshot.val()
      obj.id = childSnapshot.key
      taskData[0].data.push(obj)
    } else if (childSnapshot.val().status === 'On-Going') {
      const obj = childSnapshot.val()
      obj.id = childSnapshot.key
      taskData[1].data.push(obj)
    } else {
      const obj = childSnapshot.val()
      obj.id = childSnapshot.key
      taskData[2].data.push(obj)
    }
  })
})

export default {
  name: "Three-lists",
  display: "Three Lists",
  order: 1,
  components: {
    CardKanban
  },
  data() {
    return {
      taskLists: taskData,
      todo: '',
      name:'',
      modalShow: false
    };
  },
  methods: {
    handleSubmit(){
      // this.taskData[0].data.push({todo: this.todo, name:this.name})
      console.log(this.todo, this.name)
    }
    
  }
};
</script>

<style scoped>
  .container-card {
    padding: 5px;
  }
</style>
