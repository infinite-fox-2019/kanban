<template>
  <v-card class="form-card">
    <v-card-title class="form-title">New activity</v-card-title>
    <v-form class="submit-form">
      <v-text-field label="Title" :rules="titleRules" required v-model="form.title"></v-text-field>
      <v-text-field label="Description" :rules="descriptionRules" required v-model="form.description"></v-text-field>
      <v-text-field label="Point" :rules="pointRules" required v-model="form.point"></v-text-field>
      <v-text-field label="Assigned to" :rules="assignedRules" required v-model="form.assignee"></v-text-field>
    </v-form>
    <div class="form-buttons">
      <v-btn class="mr-4">Submit</v-btn>
      <v-btn class="mr-4" @click="clear">Clear</v-btn>
      <v-btn class="mr-4" @click="close">Close</v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  data: function () {
    return {
      form: {
        title: '',
        description: '',
        point: '',
        assignee: ''
      },
      pointRules: [
        v => !!v || 'Point is required',
        v => /^[0-9]+$/.test(v) || 'Point must be number'
      ],
      titleRules: [v => !!v || 'Title is required'],
      descriptionRules: [v => !!v || 'Description is required'],
      assignedRules: [v => !!v || 'Assignee is required']
    }
  },
  methods: {
    clear: function () {
      this.form = {
        title: '',
        description: '',
        point: '',
        assignee: ''
      }
    },
    close: function () {
      this.$emit('hide-form')
    }
  }
}
</script>

<style scoped>
.form-card {
  width: 30vw;
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
}

.form-title {
  padding: 5%;
}

.submit-form {
  padding: 0 10% 10% 10%;
}

.form-buttons {
  display: flex;
  justify-content: center;
  margin: 0 10% 10% 10%;
}
</style>
