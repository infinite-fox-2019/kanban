<template>
  <div>
    <section id="home">
      <b-container>
        <b-row class="my-5">
          <b-col class="d-flex justify-content-between">
            <h1 class="text-white">Material Kanban</h1>
            <b-button variant="primary" v-b-modal.modal-create-task>
              New Task
              <font-awesome-icon class="mx-2" icon="edit" />
            </b-button>
          </b-col>
        </b-row>
        <b-row>
          <backlog @deleteTask="deleteTask" :backlogs="backlogs" />
          <todo @deleteTask="deleteTask" :todos="todos" />
          <doing @deleteTask="deleteTask" :doings="doings" />
          <done @deleteTask="deleteTask" :dones="dones" />
        </b-row>
      </b-container>

      <!-- Modals -->
      <b-modal
        id="modal-create-task"
        ref="modal-create-task"
        title="Create New Task"
        :hide-footer="true"
        @show="resetModal"
        @hidden="resetModal"
      >
        <form @submit.prevent="addTask">
          <div class="form-group">
            <label for="name">Task Name</label>
            <input
              autofocus
              required
              v-model="inputName"
              type="text"
              class="form-control"
              id="name"
              placeholder="Enter Task Name"
            />
          </div>
          <div class="form-group">
            <label for="des">Description</label>
            <textarea required v-model="inputDes" class="form-control" id="des" rows="3"></textarea>
          </div>
          <button @click="hideModal" type="submit" class="btn btn-primary">Submit</button>
        </form>
      </b-modal>
    </section>
  </div>
</template>

<script>
//api
import Collection from "@/api/firebase";
const { Task } = Collection;

//component
import Backlog from "@/components/Backlog";
import Todo from "@/components/Todo";
import Doing from "@/components/Doing";
import Done from "@/components/Done";

export default {
  name: "Home",
  components: {
    Backlog,
    Todo,
    Doing,
    Done
  },
  data() {
    return {
      tasks: [],
      inputName: "",
      inputDes: ""
    };
  },
  computed: {
    backlogs() {
      let results = [];
      for (let i = 0; i < this.tasks.length; i++) {
        const task = this.tasks[i];
        if (task.status === 1) results.push(task);
      }
      return results;
    },
    todos() {
      let results = [];
      for (let i = 0; i < this.tasks.length; i++) {
        const task = this.tasks[i];
        if (task.status === 2) results.push(task);
      }
      return results;
    },
    doings() {
      let results = [];
      for (let i = 0; i < this.tasks.length; i++) {
        const task = this.tasks[i];
        if (task.status === 3) results.push(task);
      }
      return results;
    },
    dones() {
      let results = [];
      for (let i = 0; i < this.tasks.length; i++) {
        const task = this.tasks[i];
        if (task.status === 4) results.push(task);
      }
      return results;
    }
  },
  methods: {
    fetchTasks() {
      Task.orderBy("created_at", "desc").onSnapshot(querySnapshot => {
        var results = [];
        querySnapshot.forEach(doc => {
          var date = new Date(doc.data().created_at.seconds);
          date = `${date.getDate()} / ${date.getMonth() +
            1} / ${date.getFullYear()}`;
          results.push({
            id: doc.id,
            name: doc.data().name,
            des: doc.data().des,
            status: doc.data().status,
            created_at: date
          });
        });
        this.tasks = results;
      });
    },
    addTask() {
      Task.add({
        name: this.inputName,
        des: this.inputDes,
        status: 1,
        created_at: new Date(Date.now())
      })
        .then(docRef => {
          this.hideModal();
          this.resetModal();
        })
        .catch(err => {
          this.resetModal();
        });
    },
    deleteTask(id) {
      Task.doc(id)
        .delete()
        .then(() => {})
        .catch(err => {});
    },
    resetModal() {
      this.inputName = "";
      this.inputDes = "";
    },
    hideModal() {
      this.$refs["modal-create-task"].hide();
    }
  },
  created() {
    this.fetchTasks();
  }
};
</script>

<style>
</style>