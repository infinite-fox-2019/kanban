<template>
  <div class="container clickable card">
    <b-form @submit.prevent="onSubmit" @reset.prevent="onReset" v-if="show">
      <b-form-group
        label="Title"
      >
        <b-form-input
          v-model="form.title"
          type="text"
          required
          placeholder="Task Title"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Description">
        <b-form-input
          v-model="form.description"
          required
          placeholder="Task Short Description"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Point">
        <b-form-input
          v-model="form.point"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Assigned To">
        <b-form-input
          v-model="form.assigned"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        title: '',
        description: '',
        point: 0,
        assigned: '',
        status: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      this.form.status = 'ToDo'
      console.log(this.form)
      this.$emit('Data', this.form)
    },
    onReset (evt) {
      // Reset our form values
      this.form.title = ''
      this.form.description = ''
      this.form.point = 0
      this.form.assigned = ''
      this.form.status = ''
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style>

</style>
