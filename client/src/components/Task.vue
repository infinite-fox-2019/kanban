<template>
  <div class="container">
    <div class="notification">
      <div class="info-container">
        <div class="info-item">
          <strong>{{ name }}</strong>
        </div>
        <div class="info-item">
          <small>{{ point }}</small>
        </div>
        <div class="info-item">
          to: {{ assignedTo }}
        </div>
        <div class="info-item">
          <button class="button delete-button" @click="deleteTask" style="float: right;">
          <i class="fa fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['order', 'name', 'point', 'assignedTo'],
  methods: {
    deleteTask () {
      this.$emit('deleteTask', this.order)
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 10px;
}

.notification {
  background: #33446b;
  word-wrap: break-word;
  padding: 10px;
}

.info-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.delete-button {
  float: right;
  background-color: #33446b;
  border: none;
  color: white;
}
.delete-button:hover {
  float: right;
  background-color: #1F2940;
  border: none;
  color: rgb(223, 223, 223);
}
</style>
