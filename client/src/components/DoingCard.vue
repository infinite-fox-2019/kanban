<template>
  <div>
     <b-card
        header="Doing"
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
  background-color: #00b29c;
}
</style>
