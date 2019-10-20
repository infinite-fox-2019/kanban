<template>
    <div>

    <div class="modal fade" id="modalAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
       <div class="modal-dialog" role="document">
         <div class="modal-content">
           <div class="modal-header">
             <h5 class="modal-title" id="">Add Task</h5>
             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
             </button>
           </div>
           <div class="modal-body">
               <form id="addTask">
                   <input v-model="title" class="form-control" type="text" id="addTitle" placeholder="Title">
                   <br>
                    <input v-model="description" class="form-control" type="text" id="addDescription" placeholder="Description">
                   <br>
                   <input v-model="point"  class="form-control" type="text" id="addPoint" placeholder="Point">
                   <br>
                   <input v-model="assigned"  class="form-control" type="text" id="addAssigned" placeholder="Assigned To">
                   <br>
                   <input class="btn btn-primary" @click.prevent="addTask" type="submit" value="Add" data-dismiss="modal">
               </form>
           </div>
           <div class="modal-footer">
             <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
           </div>
         </div>
       </div>
     </div>

        <nav class="navbar navbar-expand navbar-dark bg-dark">
          <a class="navbar-brand mr-auto" href="#">KANBAN</a>
          <button class="btn btn-light" data-toggle="modal" data-target="#modalAdd" > ADD TASK </button>

        </nav>

        <div class="mt-5 d-flex justify-content-around">
            <CategoryComponent
            v-for="(category,index) in categories" :key="index"
            :all="category"
            :category="category.title"
            :dataParent="category.data"
            :warna="category.style"
            />
        </div>

    </div>

</template>

<script>
import CategoryComponent from '../components/CategoryComponent'
import db from '../../config/firestore'
export default {
  data () {
    return {
      title: '',
      description: '',
      point: '',
      assigned: '',
      tasks: [],
      categories: [
        { title: 'Back-Log', data: [], style: 'red' },
        { title: 'ToDo', data: [], style: 'orange' },
        { title: 'Doing', data: [], style: 'yellow' },
        { title: 'Done', data: [], style: 'green' }
      ]
    }
  },
  components: {
    CategoryComponent
  },
  methods: {
    addTask () {
      db.collection('tasks').add({
        title: this.title,
        description: this.description,
        point: this.point,
        assigned: this.assigned,
        status: 'backLog'

      })
        .then(doc => {
          this.title = ''
          this.description = ''
          this.point = ''
          this.assigned = ''
          // console.log(doc)
          console.log('Document written with ID: ', doc.id)
        })
        .catch(error => {
          console.error('Error adding document: ', error)
        })
    },
    backLogMethod () {
      const backLog = []
      this.tasks.forEach(task => {
        if (task.status === 'backLog') {
          // console.log("masuk backlog")
          backLog.push(task)
        }
      })
      // this.backLog = backLog
      this.categories[0].data = backLog
    },
    toDoMethod () {
      const toDo = []
      this.tasks.forEach(task => {
        if (task.status === 'toDo') {
          console.log('masuk todo')
          toDo.push(task)
        }
      })
      // this.toDo = toDo
      this.categories[1].data = toDo
    },
    doingMethod () {
      const doing = []
      this.tasks.forEach(task => {
        if (task.status === 'doing') {
          console.log('masuk doing')
          doing.push(task)
        }
      })
      // this.doing = doing
      this.categories[2].data = doing
    },
    doneMethod () {
      const done = []
      this.tasks.forEach(task => {
        if (task.status === 'done') {
          // console.log("masuk done")
          done.push(task)
        }
      })
      // this.done = done
      this.categories[3].data = done
    }
  },
  created () {
    db.collection('tasks')
      .onSnapshot(doc => {
        this.tasks = []
        doc.forEach(task => {
          // console.log(task)
          let id = task.id
          let allData = task.data()
          allData.id = id
          this.tasks.unshift(allData)
          this.backLogMethod()
          this.toDoMethod()
          this.doingMethod()
          this.doneMethod()
          // console.log(this.done)
        })
      })
  }

}
</script>

<style>

</style>
