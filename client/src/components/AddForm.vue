<template>
  <a-form>
    <a-form-item class="input" label="Title" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-input
        v-model="title"
        v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
      />
    </a-form-item>

    <a-form-item
      class="input"
      label="Description"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-textarea
        v-model="desc"
        v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
      />
    </a-form-item>

    <!-- <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }" label="due date">
      <a-date-picker v-decorator="['date-picker', config]" v-model="duedate" />
    </a-form-item> -->
  </a-form>
</template>

<script>
import moment from "moment"

export default {
  name: "AddForm",
  props: ["status"],
  data() {
    return {
      title: "",
      desc: "",
      duedate: {},
      config: {
        rules: [
          { type: "object", required: true, message: "Please select time!" }
        ]
      }
    };
  },
  methods: {},
  watch: {
    title: function() {
      this.$emit("titleChanged", this.title);
    },
    desc: function() {
      this.$emit("descChanged", this.desc);
    },
    status: function() {
      if (this.status) {
        (this.title = ""), (this.desc = ""), (this.duedate = "");
      }
    },
    duedate: function(fieldsValue) {
      // moment().format()
      // const values = {
      //   "date-picker": fieldsValue["date-picker"].format("YYYY-MM-DD")
      // };
      // console.log(values)
      // this.$emit("dateChange", values);
    }
  }
};
</script>

<style scoped>
.input {
  margin: 0.5vh;
}
</style>