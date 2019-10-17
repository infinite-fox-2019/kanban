<template>
  <div style="width: 100%">
      <b-navbar type="dark" variant="secondary" id="navbar">
          <b-navbar-brand>
            <strong>Kanban Board</strong>
          </b-navbar-brand>
          <b-button @click="showCreate" variant="primary">
              Create Task
          </b-button>
      </b-navbar>
      <div id="modalCreate" v-if="show" class="container">
        <b-form id="create" title="Create Task" >
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
        <b-button @click="onSubmit" class="btn btn-primary">Save</b-button>
        <b-button @click="onReset" class="btn btn-default">Reset</b-button>
        <b-button-close @click="close">Close</b-button-close>
        </b-form>
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
      show: false
    }
  },
  methods: {
    onSubmit () {
      this.form.status = 'ToDo'
      console.log(this.form)
      this.$emit('Data', this.form)
      this.show = false
      this.form.title = ''
      this.form.description = ''
      this.form.point = 0
      this.form.assigned = ''
      this.form.status = ''
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
    },
    showCreate () {
      this.show = true
    },
    close () {
      this.show = false
    }
  }
}
</script>

<style>
#navbar {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: rgba(44, 72, 231, 0.5);
}
#modalCreate {
  max-width: 700px;
}
</style>
