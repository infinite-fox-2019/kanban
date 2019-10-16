<template>
  <div style="width: 100%">
      <b-navbar type="dark" variant="secondary">
          <b-navbar-brand>
            <h1>Kanban Board</h1>
          </b-navbar-brand>
          <b-button v-b-modal.create variant="primary">
              Create Task
          </b-button>
      </b-navbar>
      <div id="modalCreate">
        <b-modal id="create" title="Create Task" ok.title="Create"
         @ok="onSubmit" @hidden="onReset"
         @show="onReset">
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
        </b-modal>
    </div>
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
    onSubmit () {
      this.form.status = 'ToDo'
      console.log(this.form)
      this.$emit('Data', this.form)
    },
    onReset () {
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
