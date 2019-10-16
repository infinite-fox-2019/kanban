<template>
  <div class="card bg-light mb-3" style="max-width: 18rem;">
    <h6 class="card-header">{{ task.title }}</h6>
    <div class="card-body">
      <small class="card-text">score: {{ task.score }}</small>
      <small class="card-text">assigned to: {{ task.assignedTo }}</small>
    </div>
  </div>
</template>

<script>
export default {
  props:['task']
}
</script>

<style>

</style>