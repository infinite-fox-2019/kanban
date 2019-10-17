<template>
  <div>
    <b-navbar>
      <b-navbar-brand>Kan Board</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-button variant="outline-dark" @click="addNew">New</b-button>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import db from "@/config/firestore";

export default {
  name: "Nav",
  data() {
    return {
      title: ""
    };
  },
  methods: {
    addNew() {
      Swal.fire({
        title: "What's On Your Mind?",
        input: "text",
        inputValue: this.title,
        showCancelButton: true,
        inputValidator: value => {
          if (!value) {
            return "C'mon, it can't be blank!";
          }
        }
      }).then(({ value }) => {
        db.collection("tasks")
          .doc("planning")
          .get()
          .then(doc => {
            let data = doc.data().tasks;
            data.push(value);
            return data;
          })
          .then(data => {
            db.collection("tasks")
              .doc("planning")
              .set({ tasks: data });
          });
      });
    }
  }
};
</script>
