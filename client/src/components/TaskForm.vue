<template>
  <div>
    <form @submit.prevent="add">
      <input v-model="name" class="input" type="text" placeholder="Task name">
      <input v-model="point" class="input" type="number" placeholder="Point" style="width: 80px;">
      <input v-model="assignedTo" class="input" type="text" placeholder="Assigned To">
      <button class="button add-button">
        <i class="fa fa-plus">
        </i>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      point: '',
      assignedTo: ''
    }
  },
  methods: {
    add () {
      this.$emit('addtask', {
        name: this.name,
        point: this.point,
        assignedTo: this.assignedTo
      })
    }
  }
}
</script>

<style scoped>
.add-button {
  float: right;
  background-color: #1F2940;
  border: none;
  color: white;
}
.add-button:hover {
  float: right;
  background-color: #1F2940;
  border: none;
  color: rgb(223, 223, 223);
}
.input {
  background: #dee8ff;
  border: none;
  margin-bottom: 5px;
  color: #1F2940;
}
</style>
