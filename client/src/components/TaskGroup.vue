<template>
  <div>
    <b-card :bg-variant="variant">
      <template v-slot:header>
        <h6 class="mb-0"><slot></slot></h6>
      </template>
      <b-card-text id="card">
        <b-card-group deck>
          <div
            id="task"
            v-for="(task, index) in tasks"
            :key="index"
            class="col-12"
          >
            <Task
              :task="task"
              :previous="previous"
              :next="next"
              @update="update"
            >
              <slot></slot>
            </Task>
          </div>
        </b-card-group>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import Task from "./Task";

export default {
  name: "TaskGroup",
  components: {
    Task
  },
  props: {
    tasks: Array,
    previous: String,
    next: String,
    variant: String
  },
  methods: {
    update(data) {
      this.$emit("update", data);
    }
  }
};
</script>

<style scoped>
#task {
  margin-bottom: 25px;
}
#card {
  min-height: 250px !important;
}
</style>
