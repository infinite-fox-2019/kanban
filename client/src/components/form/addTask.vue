<template>
    <div>
        <b-modal
        id="modal-lg"
        size="lg"
        ref="modal"
        title="Submit Your Task"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
        >
        <form ref="form" @submit.prevent="handleSubmit">
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
import db from '../../../config/firestore.js'

export default {
  name: 'ModalAddTask',
  data () {
    return {
      title: '',
      description: '',
      point: '',
      assignTo: '',
      status: 'todo'
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
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit () {
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
