<template>
  <a-card hoverable style="width: 100%">
    <template class="ant-card-actions" slot="actions">
      <a-icon type="caret-left" @click="stepBackward" />
      <PopupDelete :id="id"></PopupDelete>
      <a-icon type="caret-right" @click="stepForward" />
    </template>
    <a-card-meta :title="title" :description="desc">
      <a-icon type="clock-circle" />
    </a-card-meta>
  </a-card>
</template>

<script>
import db from "../../config/firestore";
import Swal from "sweetalert";
import PopupDelete from "../components/PopupDelete";
import moment from "moment";
export default {
  name: "Card",
  props: ["title", "desc", "id", "status", "date"],
  data() {
    return {};
  },
  components: {
    PopupDelete
  },
  methods: {
    getMoment() {
    //   return this.date.seconds
      var t = new Date(Number(this.date.seconds)); // Epoch
        return t
    //   t.setSeconds(this.date);
    //   let newDate = new Date(t);
    //   moment().format();
    //   return moment(newDate).format("DD-MM-YYYY");
    },
    stepForward() {
      let update = {};
      if (this.status === "finished") {
        Swal("task already finished!");
      } else if (this.status === "unstarted") {
        update = { status: "on progress" };
        this.update(update);
      } else if (this.status === "on progress") {
        update = { status: "finished" };
        this.update(update);
      }
    },
    stepBackward() {
      let update = {};
      if (this.status === "unstarted") {
        Swal("Really? Do your task dude!");
      } else if (this.status === "on progress") {
        update = { status: "unstarted" };
        this.update(update);
      } else if (this.status === "finished") {
        update = { status: "on progress" };
        this.update(update);
      }
    },
    update(update) {
      if (localStorage.getItem("token")) {
        db.collection("task")
          .doc(this.id)
          .update(update)
          .then(_ => {
            console.log("selesai update");
          });
      } else {
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style>
</style>