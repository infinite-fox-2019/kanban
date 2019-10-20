<template>
  <div class="home">
    <Navbar></Navbar>
    <a-row type="flex" justify="space-around" align="top">
      
      <a-col :span="5" class="border shadow"><p>Back-log</p>
      <hr>
        <div v-for="card in cards" :key="card.id">
          <Card 
            v-if='card.data.status === "Back-Log"'
            v-bind:card="card"
          ></Card>
        </div>
      </a-col>

      <a-col :span="5" class="border shadow"><p>To-Do</p>
      <hr>
      <div v-for="card in cards" :key="card.id">
          <Card 
            v-if='card.data.status === "To-Do"'
            v-bind:card="card"
          ></Card>
        </div>
      </a-col>

      <a-col :span="5" class="border shadow"><p>Doing</p>
      <hr>
      <div v-for="card in cards" :key="card.id">
          <Card 
            v-if='card.data.status === "Doing"'
            v-bind:card="card"
          ></Card>
        </div>
      </a-col>

      <a-col :span="5" class="border shadow"><p>Done</p>
      <hr>
      <div v-for="card in cards" :key="card.id">
          <Card 
            v-if='card.data.status === "Done"'
            v-bind:card="card"
          ></Card>
        </div>
      </a-col>

    </a-row>
  </div>
</template>

<script>
import Card from '../components/Card'
import Navbar from '../components/Navbar'
import db from '../../config/firestore'


export default {
  name : 'home',
  components : {
    Card,
    Navbar
  },
  data(){
    return{
      cards : []
    }
  },
  created(){
    let uid = localStorage.getItem('uid')
    db.collection("tasks").where("userId",'==',uid)
    .onSnapshot((doc)=>{
      let temp = []
      doc.docs.forEach(el=>{
        let obj = {
            id : el.id,
            data : el.data()
          }
        temp.push(obj)
        obj = {}
      })
      console.log(temp);
    this.cards = temp
    });
  }

}
</script>

<style scoped>
.border.shadow{
  border: 0.4px solid rgba(0, 0, 0, 0.103);
  box-shadow: 2px 5px 5px 0px rgba(0, 0, 0, 0.322)
}
a-row{
   /* type="flex" justify="space-around" align="middle" align-items="flex-start" */
   display: flex;
   justify-content: space-around;
   align-items: flex-start;
}
</style>
