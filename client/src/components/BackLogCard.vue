<template>
  <div>
     <b-card
        header="Back-Log"
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
  name: 'BackLogCard'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-header {
  background-color: #fc3458;
}
</style>
