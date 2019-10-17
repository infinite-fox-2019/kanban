<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand class="titleFont" href="#">DipadanaTheReactiveKanban</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#"></b-nav-item>
          <b-nav-item href="#" disabled>V.0.1</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-button v-b-modal.modal-prevent-closing size="sm" class="my-2 my-sm-0" variant="light" type="submit">Add task</b-button>
          <!-- <b-button @click="login" size="sm" class="my-2 my-sm-0 ml-2" variant="light" type="submit">Login</b-button> -->

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

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
    </div>
</template>

<script>
const firebase = require('firebase/app')
require('firebase/auth')

export default {
  name: 'navbar',
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
    },
    login () {
      var provider = new firebase.auth.GoogleAuthProvider()

      firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken
        // The signed-in user info.
        var user = result.user
        console.log(user)
        // ...
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // The email of the user's account used.
        var email = error.email
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential
        // ...
      })
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Mansalva&display=swap');
.titleFont{
  font-family: 'Mansalva', cursive;
  font-size: 25px;
}
</style>
