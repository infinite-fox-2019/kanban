<template>
  <div class="p-2">
    <b-card-group deck>
      <b-card
        :header="task.title"
      >
        <p>{{ task.description }}</p>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: [
    'task'
  ]
}
</script>

<style scoped>
  .card-header {
    background-color: white;
  }
</style>
