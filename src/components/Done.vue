<template>
  <b-col md="3" class="my-2">
    <b-card
      header="Done"
      header-bg-variant="success"
      header-text-variant="white"
      header-class="text-left font-weight-bold"
    >
    <b-row>
        <b-col class="my-2" md="12" v-for="task in dones" :key="task.id">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <div>
                <b>{{ task.name }}</b>
                <br />
                <small>Created at : {{ task.created_at }}</small>
              </div>
              <button @click="deleteTask(task.id)" class="btn btn-light btn-sm py-1 px-2">
                <font-awesome-icon icon="trash" />
              </button>
            </div>
            <div class="card-body text-left">
              <p class="text-justify">{{ task.des }}</p>
              <div class="d-flex justify-content-start">
                <button @click="updateToDoing(task.id)" class="btn btn-sm btn-primary">
                  <font-awesome-icon icon="arrow-circle-left" class="mx-1" />
                  Doing
                </button>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    
    </b-card>
  </b-col>
</template>

<script>
import Collection from "../api/firebase";
const { Task } = Collection;

export default {
  props: ["dones"],
  methods: {
    deleteTask(id) {
      this.$emit("deleteTask", id);
    },
    updateToDoing(id) {
      Task.doc(id)
        .update({
          status: 3
        })
        .then(() => {})
        .catch(err => {});
    }
  }
};
</script>

<style>
</style>