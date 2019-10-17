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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: Number,
    name: String,
    point: String,
    assignedTo: String
  }
}
</script>

<style scoped>
.container {
  margin-top: 10px;
}

.notification {
  background: #33446b;
}

.info-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
