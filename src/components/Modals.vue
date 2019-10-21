<template>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Task"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="titleState"
          label="Title"
          label-for="title-input"
          invalid-feedback="Title is required"
        >
          <b-form-input
            id="title-input"
            v-model="title"
            :state="titleState"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          :state="descriptionState"
          label="Description"
          label-for="description-input"
          invalid-feedback="Description is required"
        >
          <b-form-input
            id="descreption-input"
            v-model="description"
            :state="descriptionState"
            required
          >
          </b-form-input>
        </b-form-group>
      </form>
    </b-modal>

</template>

<script>
export default {
  name: 'modals',
  data () {
    return {
      title: '',
      titleState: null,
      description: '',
      descriptionState: null,
      submittedNames: []
    }
  },
  methods: {
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.titleState = !!valid
      this.descriptionState = !!valid
      return valid
    },
    resetModal () {
      this.title = ''
      this.titleState = null
      this.description = ''
      this.descriptionState = null
    },
    handleOk (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit () {
      if (!this.checkFormValidity()) {
        return
      }
      this.$emit('dataFromForm', this.title, this.description, 'backlog')
      this.$nextTick(() => {
        this.$refs.modal.hide()
      })
    }
  }
}
</script>
