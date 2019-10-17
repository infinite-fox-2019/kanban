<template>
  <div>
    <div class="col">
      {{ item }}
    </div>
    <div class="col">
      <b-button @click="deleteItem(item)">Delete</b-button>
    </div>
  </div>
</template>

<script>
import db from "@/config/firestore";
import Swal from "sweetalert2";

export default {
  name: "Item",
  props: {
    item: String,
    collection: String,
    data: Array
  },
  methods: {
    deleteItem(title) {
      let index = this.data.indexOf(title);
      this.data.splice(index, 1);
      Swal.fire("Congratulations!", "Task Deleted!", "success");
      db.collection("tasks")
        .doc(this.collection)
        .set({ tasks: this.data });
    }
  }
};
</script>

<style></style>
