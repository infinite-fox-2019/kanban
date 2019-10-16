<template>
  <div class="container">
    <div class="notification">
      {{ order }} {{ name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: Number,
    name: String
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
</style>
