<template>
  <div id="nav">
    <a-row>
      <a-col :span="12">
    <p>Kanban</p>
      </a-col>
      <a-col :span="12">
    
    <a-button type="primary" @click="showModal">Add new task</a-button>
      <a-modal
        title="Add new task"
        :visible="visible"
        @ok="handleOk"
        :confirmLoading="confirmLoading"
        @cancel="handleCancel"
      >
      <div>
        <a-form :layout="formLayout">
        
        <a-form-item
          label="Title"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input placeholder="Task title" v-model="title"/>
        </a-form-item>
        
        <a-form-item
          label="Description"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
        <!-- <a-input placeholder="Task description" v-model='descriptions'/> -->
        <a-textarea placeholder="Basic usage" :rows="4" v-model='descriptions' />
        </a-form-item>

        <a-form-item
        label="Assigned To"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        >
        <a-input placeholder="Assigned To" v-model='assignedTo'/>
        </a-form-item>
          <!-- <a-form-item
          label="Due Date"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-date-picker 
          v-model="dueDate"
            style="width: 50%" 
            @change="onchange" 
            :disabledDate="disabledDate"/>
        </a-form-item> -->

        </a-form>
      </div>
    </a-modal>
    <a-button type='primary' @click="logout" id="logout">logout </a-button>
  </a-col>
  </a-row>
  </div>
</template>



<script>
import db from '../../config/firestore'
import moment from 'moment'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};


  export default {
    data() {
      return {
        visible: false,
        confirmLoading: false,
        formLayout: 'horizontal',
        title : '',
        descriptions : '',
        assignedTo : '',
        // dueDate : {}
      };
    },
    methods: {
      moment,
      showModal() {
        let uid = localStorage.getItem('uid')
        if(uid){
        this.visible = true;
        }
      },
      handleOk(e) {
        let uid = localStorage.getItem('uid')
        this.confirmLoading = true;
        db.collection("tasks").add({
          title: this.title,
          descriptions: this.descriptions,
          assignedTo: this.assignedTo,
          status: 'Back-Log',
          // dueDate : this.dueDate._d
          userId :  uid
        })
        .then((docRef)=>{
          console.log("Document written with ID: ", docRef.id);
          this.visible = false;
          this.confirmLoading = false;
        })
        .catch((error)=>{
          console.error("Error adding document: ", error);
        });

      },
      handleCancel(e) {
        console.log('Clicked cancel button');
        this.visible = false;
      },
      onchange(){
        console.log();
      },
      disabledDate(current) {
        // Can not select days before today and today
        return current < moment().endOf('day');
      },
      logout(){
        localStorage.removeItem('uid')
        this.$router.push('/')
      }
    },
    computed: {
      formItemLayout() {
        const { formLayout } = this;
        return formLayout === 'horizontal' ? { labelCol: { span: 4 }, wrapperCol: { span: 14 },}: {};
      },
      buttonItemLayout() {
        const { formLayout } = this;
        return formLayout === 'horizontal'? {wrapperCol: { span: 14, offset: 4 },}: {};
      },
    },
  };
</script>

<style scoped>
#logout{
  margin : 0px 10px;
}

</style>
