<template>
  <div>
    <!-- title -->
    <b-form-group
      id="fieldset-1"
      label="Title"
      label-for="input-1"
      :invalid-feedback="invalidFeedback"
      :valid-feedback="validFeedback"
      :state="state"
    >
      <b-form-input id="input-1" v-model="title" :state="state" trim></b-form-input>
    </b-form-group>

    <!-- description -->
    <b-form-group
      id="fieldset-2"
      label="Description"
      label-for="textarea2"
    >
      <b-form-textarea
        id="textarea1"
        placeholder="Description"
        required
        v-model="description"
      ></b-form-textarea>
    </b-form-group>

    <!-- Score -->
    <b-form-group
      id="fieldset-3"
      label="Score"
      label-for="input-2"
    >
      <b-form-input
        id="input-2"
        type="number"
        required
        placeholder="Enter score"
        v-model="score"
        min="0"
        max="100"
      ></b-form-input>
    </b-form-group>

    <!-- Assigned to -->
    <b-form-group
      id="fieldset-4"
      label="Assigned To"
      label-for="input-3"
    >
      <b-form-input
        id="input-3"
        required
        placeholder="Assigned To"
        v-model="assignedTo"
      ></b-form-input>
    </b-form-group>
  </div>
</template>

<script>
export default {
  computed: {
    state () {
      return this.title.length >= 6
    },
    invalidFeedback () {
      if (this.title.length > 6) {
        return ''
      } else if (this.title.length > 0) {
        return 'Enter at least 6 characters'
      } else {
        return 'Please enter something'
      }
    },
    validFeedback () {
      return this.state === true ? 'Thank you' : ''
    }
  },
  props: {
    controll: {
      type: Boolean
    }
  },
  data () {
    return {
      title: '',
      description: '',
      score: '',
      assignedTo: ''
    }
  },
  watch: {
    controll () {
      if (this.controll == true) {
        this.title = ''
        this.description = '',
        this.score = '',
        this.assignedTo = ''
      }
    },
    title () {
      const obj = {
        title: this.title,
        description: this.description,
        score: this.score,
        assignedTo: this.assignedTo
      }
      this.$emit('updateInput', obj)
    },
    description () {
      const obj = {
        title: this.title,
        description: this.description,
        score: this.score,
        assignedTo: this.assignedTo
      }
      this.$emit('updateInput', obj)
    },
    score () {
      const obj = {
        title: this.title,
        description: this.description,
        score: this.score,
        assignedTo: this.assignedTo
      }
      this.$emit('updateInput', obj)
    },
    assignedTo () {
      const obj = {
        title: this.title,
        description: this.description,
        score: this.score,
        assignedTo: this.assignedTo
      }
      this.$emit('updateInput', obj)
    }
  }
}
</script>

<style>

</style>
