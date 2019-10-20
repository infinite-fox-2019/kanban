<template>
    <div >

      <div class="modal fade" v-bind:id="taskItem.id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
       <div class="modal-dialog" role="document">
         <div class="modal-content">
           <div class="modal-header">
             <h5 class="modal-title" id="">Add Task</h5>
             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
             </button>
           </div>
           <div class="modal-body">
               <form id="detailTask">
                   <p>Title : {{title}}</p>
                   <br>
                    <p>Description : {{description}}</p>
                   <br>
                   <p>point: {{point}}</p>
                   <br>
                   <p>assigned to:{{assigned}} </p>
                   <br>
                   <div class="justify-content-between">
                    <button id="backLogButton" v-if="status != 'backLog'" @click.prevent="changeBackLog" class="btn btn-danger mx-2" type="submit" data-dismiss="modal">Change backLog</button>
                    <button id="toDoButton" v-if="status != 'toDo'" @click.prevent="changeToDo" class="btn btn-warning mx-2" style="backgroundColor:orange" type="submit" data-dismiss="modal">Change toDo</button>
                    <button id="doingButton" v-if="status != 'doing'" @click.prevent="changeDoing" class="btn btn-warning mx-2" style="backgroundColor:yellow" type="submit" data-dismiss="modal">Change doing</button>
                    <button id="doneButton" v-if="status != 'done'" @click.prevent="changeDone" class="btn btn-success mx-2" style="backgroundColor:green" type="submit" data-dismiss="modal">Change done</button>
                   </div>

                   <button @click.prevent="deleteTask(id)" class="btn btn-danger my-2" type="submit" data-dismiss="modal" value="delete">Delete</button>
               </form>
           </div>
           <div class="modal-footer">
             <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
           </div>
         </div>
       </div>
     </div>

      <div  class="card-body">

        <h3  class="card-title pricing-card-title"> <strong> {{taskItem.title}} </strong> </h3>
          <p>point : {{taskItem.point}}</p>
          <p>assigned to : {{taskItem.assigned}}</p>
        <button
        @click.prevent="setDetail(taskItem.id, taskItem.title, taskItem.description, taskItem.point, taskItem.assigned, taskItem.status)"
        type="button" class="btn btn-lg btn-block btn-outline-primary"
        data-toggle="modal" v-bind:data-target="`#${taskItem.id}`" >Show Detail
        </button>
      </div>

    </div>
</template>

<script>
import db from '../../config/firestore'
export default {
  props: ['taskItem'],
  data () {
    return {
      id: '',
      title: '',
      description: '',
      point: '',
      assigned: ''
    }
  },
  methods: {
    setDetail (id, title, description, point, assigned, status) {
      this.id = id
      this.title = title
      this.description = description
      this.point = point
      this.assigned = assigned
      this.status = status
      console.log(this.id, this.title, this.description, this.point, this.assigned, this.status)
    },
    deleteTask (id) {
      console.log(id)
      db.collection('tasks').doc(id).delete().then(_ => {
        console.log('Document successfully deleted!')
      }).catch((error) => {
        console.error('Error removing document: ', error)
      })
    },
    changeBackLog () {
      db.collection('tasks').doc(`${this.id}`)
        .update({
          status: 'backLog'
        })
    },
    changeToDo () {
      db.collection('tasks').doc(`${this.id}`)
        .update({
          status: 'toDo'
        })
    },
    changeDoing () {
      db.collection('tasks').doc(`${this.id}`)
        .update({
          status: 'doing'
        })
    },
    changeDone () {
      db.collection('tasks').doc(`${this.id}`)
        .update({
          status: 'done'
        })
    }
  }
}
</script>

<style>

</style>
