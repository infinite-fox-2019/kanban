  <template>
  <div class="card" :style="{ backgroundColor: color}" >
      <span><strong>{{task.title}}</strong></span>
      <hr>
      <div>Description: {{ task.description }}</div>
      <div>Status: {{status}}</div>
      <hr>
      <span>
      <i class="far fa-trash-alt" @click.prevent="deleteTask(task.id)" style="cursor:pointer;"></i> | <a href="" data-toggle="modal" :data-target="'#'+task.id"><i class="fas fa-edit"></i></a>
    <edit :task="task"/>
      </span>
  </div>

</template>

<script>
import edit from './Edit'
import db from '../config/firestore'
export default {
  name: 'Task',
  components: {
    edit
  },
  props: ['task', 'color', 'status'],
  data () {
    return {
      editMode: false,
      edited: {
        title: '',
        description: '',
        status: ''
      }
    }
  },
  methods: {
    deleteTask (id) {
      db.collection('tasks').doc(id).delete()
    },
    updateTask (task) {
      this.$emit('updateTask', task)
    }
  }
}
</script>

<style>
    .card {
        display: flex;
        flex-direction: column;
        padding: 10px;
        border: 1px solid grey;
        margin: 10px auto;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        width: 90%;
        /* min-height:  */
    }
    .card:hover {
        border: 1.5px solid rgb(20, 5, 5);
        background-color: rgb(246, 163, 163);
        cursor: grab;
    }
    i {
      color: rgb(44, 44, 44);
      padding: 3px;
      margin: 0 10px;
    }
    i:hover {
      color: rgb(3, 146, 146);
      transform: scale(1.5);
    }
</style>
