<template>
    <div>
        <b-modal
        id="modal-lg"
        size="lg"
        ref="modal"
        title="Submit Your Name"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
        >
        <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group
                label="Title"
                label-for="name-input"
                invalid-feedback="Name is required"
            >
                <b-form-input
                    id="name-input"
                    v-model="title"
                    placeholder= "Task Title"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group
                label="Description"
                label-for="name-input"
                invalid-feedback="Name is required"
            >
                <b-form-input
                    id="name-input"
                    v-model="description"
                    placeholder= "Description"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group
                label="Point"
                label-for="name-input"
                invalid-feedback="Name is required"
            >
                <b-form-input
                    id="name-input"
                    v-model="point"
                    placeholder= "0"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group
                label="Assign To"
                label-for="name-input"
                invalid-feedback="Name is required"
            >
                <b-form-input
                    id="name-input"
                    v-model="assignTo"
                    placeholder= "Assign To"
                    required
                ></b-form-input>
            </b-form-group>
        </form>
        </b-modal>
    </div>
    </template>

<script>
import db from '../../../config/firebase'

export default {
  name: 'ModalEditTask',
  data () {
    return {
      title: '',
      description: '',
      point: '',
      assignTo: '',
      status: ''
    }
  },
  methods: {
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid ? 'valid' : 'invalid'
      return valid
    },
    resetModal () {
      this.name = ''
      this.nameState = null
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit () {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      db.collection('Task').add({
        title: this.title,
        description: this.description,
        point: this.point,
        assignTo: this.assignTo,
        status: this.status
      })
        .then(function (docRef) {
          console.log('Document written with ID: ', docRef.id)
        })
        .catch(function (error) {
          console.error('Error adding document: ', error)
        })
      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs.modal.hide()
      })
    }
  }
}
</script>
