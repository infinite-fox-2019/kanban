<template>
  <div class="container">
    <div class="row">
      <h1 class="col">Kanban</h1>
      <b-button @click="addNew" class="col-2">Add New</b-button>
    </div>
    <div class="row">
      <b-card-group class="row" deck>
        <TaskGroup
          :tasks="planningTasks"
          class="col"
          next="On Progress"
          variant="danger"
          @update="refresh"
          >Planning</TaskGroup
        >
        <TaskGroup
          :tasks="onProgressTasks"
          class="col"
          previous="Planning"
          next="Completed"
          variant="warning"
          @update="refresh"
        >
          On Progress</TaskGroup
        >
        <TaskGroup
          :tasks="completedTasks"
          class="col"
          previous="On Progress"
          variant="success"
          @update="refresh"
          >Completed</TaskGroup
        >
      </b-card-group>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import db from "@/config/firestore";
import TaskGroup from "@/components/TaskGroup";

export default {
  name: "home",
  components: {
    TaskGroup
  },
  data() {
    return {
      planningTasks: [],
      onProgressTasks: [],
      completedTasks: []
    };
  },
  methods: {
    getTasks() {
      this.planningTasks = [];
      this.onProgressTasks = [];
      this.completedTasks = [];
      db.collection("tasks").onSnapshot(({ docs }) => {
        docs.forEach(element => {
          const data = { id: element.id, title: element.data().title };
          if (element.data().category.toLowerCase() === "planning") {
            this.planningTasks.push(data);
          } else if (element.data().category.toLowerCase() === "on progress") {
            this.onProgressTasks.push(data);
          } else {
            this.completedTasks.push(data);
          }
        });
      });
    },
    refresh() {
      this.getTasks();
    },
    addNew() {
      this.$router.push("/add");
    }
  },
  mounted() {
    this.getTasks();
  },
  watch: {
    count() {
      this.getTasks();
    }
  }
};
</script>
