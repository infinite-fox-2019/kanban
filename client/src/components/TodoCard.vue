<template>
  <div>
     <b-card
        header="To-do"
        header-text-variant="white"
        header-tag="header"
        title="Title"
        style="max-width: 20rem;"
    >
      <b-card-text>Header and footers variants.</b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'TodoCard'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-header {
  background-color: #f8ae01;
}
</style>
