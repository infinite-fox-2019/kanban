<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Title:">
        <b-form-input
          v-model="title"
          type="text"
          required
          placeholder="Enter Title"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: ""
    };
  },
  methods: {
    onSubmit() {
      console.log(this.title);
      this.$router.push("/");
    }
  }
};
</script>
