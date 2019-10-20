<template>
<div>
    <a-card hoverable class="box">
    <template class="ant-card-actions" slot="actions">
        <a-popconfirm
    title="Are you sure delete this task?"
    @confirm="deleteCard"
    @cancel="cancel"
    okText="Yes"
    cancelText="No"
  >
      <a-icon type="delete"/>
  </a-popconfirm>
       <a-icon type="bars" @click="showModal" />
       <a-dropdown>
         <a class="ant-dropdown-link" href="#"> <a-icon type="edit" @click="updateStatus"/> </a>
           <a-menu slot="overlay">
            <a-menu-item v-for="stat in status" :key="stat.id">
              <a href="javascript:;" @click="updateStatus(stat)">Update status : {{stat}}</a>
            </a-menu-item>
          </a-menu>
          <!-- <a-icon type="edit" @click="updateStatus"/> -->
       </a-dropdown>
    </template>
    <a-card-meta :title=card.data.title>
    </a-card-meta>
      <p>Assigned To: {{card.data.assignedTo}}</p>
      <!-- <p>Due Date: {{card.data.dueDate}}</p> -->
  </a-card>
  <div>
    <a-modal :title="card.data.title" v-model="visible" @ok="handleOk">
      <p>Assigned to : {{card.data.assignedTo}}</p>
      <!-- <p>Due date : {{card.data.dueDate}}</p> -->
      <p>Descriptions : {{card.data.descriptions}}</p>
      <p>Status : {{card.data.status}}</p>
       <!-- <button type="button"
      v-clipboard:copy="card.data.descriptions"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError">Copy!</button> -->
    </a-modal>
  </div>
</div>
</template>

<script>
import db from '../../config/firestore'
import moment from 'moment'

export default {
  name : 'Card',
  props : ['card'],
  data(){
    return{
      updateStat : '',
      status : [],
      date : '',
      visible: false,
    }
  },
  methods : {
    deleteCard(){
      // this.$emit('deleteCard',this.card.)
      console.log(this.card.id);
      db.collection("tasks").doc(`${this.card.id}`).delete().then(function() {
          console.log("Document successfully deleted!");
           this.$message.success('Task Deleted');
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
    },
    updateStatus(stat){
      // console.log(this.card.data.status);
      // let status = this.statusAvailable(this.card.data.status)
      // console.log(status);
      db.collection("tasks").doc(`${this.card.id}`)
        .update({"status": stat})
          .then((success)=>{
            console.log('update success');
          })
          .catch((err)=>{
            console.log(err);
          })
    },
    setDate(){
      let tanggal = moment(this.card.data.dueDate).format("MM DD YYYY")
      console.log(tanggal)
    //   let timestamp = this.card.data.dueDate.seconds
    // let tanggal = moment.unix(timestamp).format("MM-DD-YYYY").toString()
    this.date = tanggal 

    },
    detailCard(){
      console.log('card clicked')
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      // console.log(e);
      this.visible = false;
    },
    confirm(e) {
      console.log(e);
     
    },
    cancel(e) {
      console.log(e);
      this.$message.error('Click on No');
    },
     onCopy: function (e) {
      alert('You just copied: ' + e.text)
    },
    onError: function (e) {
      alert('Failed to copy texts')
    }
  },
  created(){
    // this.setDate()
      // console.log(this.card.data.dueDate.seconds);
      // console.log(typeof tanggal._d)
      // console.log(typeof tanggal)
      // for (let key in tanggal._d){
      //   console.log(key)
      // }
      // console.log(this.date._d);
      // this.date = tanggal._d
      let stat = this.card.data.status
      if(stat === "Back-Log"){
        return this.status = ["To-Do"] 
      } else if (stat === "To-Do"){
        return this.status = ["Back-Log","Doing"] 
      } else if (stat === "Doing"){
        return this.status = ["To-Do","Done"] 
      } else if (stat === "Done"){
        return this.status = ["Doing"] 
      } 
  },
  computed : {
    // setDate(){
      // let tanggal = moment(this.card.data.dueDate).format("MM DD YYYY")
      // console.log(tanggal)
    //   let timestamp = this.card.data.dueDate.seconds
    // let tanggal = moment.unix(timestamp).format("MM-DD-YYYY").toString()
    // this.date = tanggal 

    // }
  }




}
</script>

<style scoped>
.box{
  width: 80%;
  margin: 5px auto;
  word-wrap: break-word;
}
</style>