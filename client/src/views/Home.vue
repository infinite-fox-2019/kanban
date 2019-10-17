<template>
  <div class="home">
    <a-row id="header">
      <a-col :span="2">
        <a-button type="warning" @click="logout">Logout</a-button>
      </a-col>
      <a-col :span="20" id="header-title">Welcome to Sans-Kanban! {{ displayName }}</a-col>
      <a-col :span="2">
        <a-button type="primary" @click="showForm">add notes!</a-button>
        <a-modal :visible="visible" :confirmLoading="confirmLoading" @ok="addTask" @cancel="handleCancel" id="centered">
          <h2>Add Task!</h2>
          <AddForm @titleChanged="changeTitle" @descChanged="changeDesc" @dateChange="changeDeadline" :status="deleteForm"></AddForm>
        </a-modal>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="8"><Board :title="status[0]"></Board></a-col>
      <a-col :span="8"><Board :title="status[1]"></Board></a-col>
      <a-col :span="8"><Board :title="status[2]"></Board></a-col>
    </a-row>
  </div>
</template>

<script>
// @ is an alias to /src
import  db  from "../../config/firestore"
import { auth , provider } from "../../config/auth"
import Swal from "sweetalert"
import Board from '../components/Board'
import AddForm from '../components/AddForm'

export default {
  name: 'home',
  data(){
    return{
      status : ["unstarted" , "on progress" , "finished"],
      visible : false,
      confirmLoading : false,
      title : '',
      desc : '',
      deadline : '',
      deleteForm : false,
      displayName : localStorage.getItem('pengabdisetan')
    }
  },
  components: {
    Board,
    AddForm
  },
  methods: {
    logout(){
      auth.signOut()
      .then( _ => {
        localStorage.removeItem('token')
        this.$router.push('/login')
      })
      .catch( err => {
        Swal('Sorry something bad happen in our server')
      })
    },
    showForm(){
      this.visible = true
    },
    addTask(){
      if(localStorage.getItem('token')){
        this.confirmLoading = true
        db.collection('task').add({
          UserToken : localStorage.getItem('token'),
          title: this.title,
          desc: this.desc,
          // deadline : this.deadline,
          status: 'unstarted'
        })
        .then( docRef => {
          this.confirmLoading = false
          this.visible = false
          this.deleteForm = true
        })
        .catch( err => {
          this.visible = false
          this.confirmLoading = false
          Swal('Oops! Something wrong happen in our server. try again later!')
        })
      } else {
        this.$router.push({path:'/login'})
      }

    },
    handleCancel(){
      this.visible = false
      this.deleteForm = false
    },
    changeTitle(payload){
      this.title = payload
      this.deleteForm = false
    },
    changeDesc(payload){
      this.desc = payload
      this.deleteForm = false
    },
    changeDeadline(payload){
      this.deadline = payload._d
      this.deleteForm = false
    }
  },
  created(){
    if(!localStorage.getItem('token')){
      this.$router.push({path : '/login'})
    }
  }
};
</script>

<style scoped>

#centered{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
h2{
  font-family: 'Josefin Sans', sans-serif;
}
#header{
  margin: 2vh;
  padding: 2vh;
  border-radius: 10px;
  background-color: #E7ECEF;
}
#header-title{
  font-family: 'Permanent Marker', cursive;
  font-weight: 400;
  font-size: 24px;
}
</style>