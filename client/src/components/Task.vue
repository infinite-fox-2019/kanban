<template>
  <div>
    <b-card>
      <template v-slot:header>
        <h6 class="mb-0">{{ task.title }}</h6>
        <p>{{ task.description }}</p>
      </template>
      <b-card-text></b-card-text>
      <b-button-group>
        <b-button v-if="previous" @click="goBefore(task.id)" variant="secondary"
          >Previous</b-button
        >
        <b-button v-if="next" @click="goNext(task.id)" variant="secondary">
          Next
        </b-button>
      </b-button-group>
    </b-card>
  </div>
</template>

<script>
import db from "@/config/firestore";
export default {
  name: "Task",
  props: {
    task: Object,
    previous: String,
    next: String
  },
  data() {
    return {
      status: String
    };
  },
  methods: {
    goBefore(id) {
      db.collection("tasks")
        .doc(id)
        .set({
          category: this.previous,
          title: this.task.title
        })
        .then(() => {
          this.$emit("update", this.task);
        })
        .catch(console.log);
    },
    goNext(id) {
      db.collection("tasks")
        .doc(id)
        .set({
          category: this.next,
          title: this.task.title
        })
        .then(() => {
          this.$emit("update", this.task);
        })
        .catch(console.log);
    }
  },
  mounted() {
    this.status = this.$slots.default[0].text;
  }
};
</script>

<style></style>
