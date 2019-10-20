<template>
    <div class="card ml-3 mb-3" style="width: 16rem; cursor: grab">
        <div class="card-header" style="background-color: #d7d9d7">
            {{ task.title }}
        </div>
        <div class="card-body d-flex flex-column align-items-start">
            <span> Description: {{ task.description }} </span>
            <span> Point : {{ task.point }} </span>
            <span> Assigned to: {{ task.assigned_to }} </span>
        </div>
         <div class="card-footer d-flex justify-content-end">
           <a href="" @click.prevent="deleteTask">🗑️</a>
        </div>
    </div>
</template>

<script>
import db from '@/config/firebase'
import Swal from 'sweetalert2'

const tasks = db.collection('tasks')

export default {
  name: 'Task',
  props: ['task'],
  components: { },
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
      })
        .then((result) => {
          if (result.value) {
            tasks.doc(this.task.id).delete()
              .then(() => {
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success')
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
