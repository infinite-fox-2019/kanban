<template>

    <div class="task" :style="`background-color: rgba(${baseColor}, 0.746); box-shadow: 2px 2px 21px 7px rgba(${baseColor},0.25);`">
      <div class="taskTitle">
        <h3>{{ task.title }}</h3>
      </div>
      <div class="taskDescription">
        <p>{{ task.description }}</p>
      </div>
        <div class="d-flex justify-content-between mx-2">
          <i @click.prevent="deleteTask" class="fas fa-trash trash"></i>

          <div class="text-center">
            <a href="" data-toggle="modal" :data-target="'#'+task.id"><i class="far fa-edit Iedit"></i></a>
         </div>

          <edit :task="task"/>
        </div>

    </div>

</template>

<script>
import db from '@/config/fireStore.js'
import edit from '@/components/edit.vue'
import Swal from 'sweetalert2'

export default {
  components: {
    edit
  },
  props: ['task', 'baseColor'],
  methods: {
    deleteTask () {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          Swal.showLoading()
          db.collection('task')
            .doc(this.task.id)
            .delete()
            .then(() => {
              Swal.close()
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    }
  }
}
</script>

<style>
.task{
  height: 100px;
  background-color: rgba(59, 115, 245, 0.746);
  width: 100%;
  margin: 10px 0;
  border-radius: 15px;
  box-shadow: 2px 2px 21px 7px rgba(59, 115, 245,0.25);
  transition: 300ms;
  cursor: pointer;
}

.taskTitle {
  padding: 3px;
}

.taskTitle h3 {
  font-size: 15px;
}

.taskDescription{
  padding: 5px;
}

.taskDescription p{
  color: white;
  font: 100;
  font-size: 12px;
  text-align: left;
}

.trash{
  font-size: 11px;
  text-align: right;
  color: rgb(44, 44, 44);
  transition: 200ms;
}

.trash:hover{
  color: rgb(233, 64, 64);
  font-size: 15px;

}

.Iedit {
 font-size: 10px;
 transition: 200ms;
 color: rgb(44, 44, 44);
}

.Iedit:hover {
 color: rgb(255, 255, 255);
 font-size: 14px;
}
</style>
