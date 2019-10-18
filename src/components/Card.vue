<template>

    <b-card style="color:black" :header="data.title" class="text-center mb-3">
      <b-card-text>{{data.description}}</b-card-text>
      <b-button variant="danger" @click.prevent="deleteData(data.id)">Delete</b-button>
    </b-card>

</template>

<script>
export default {
  name:"Card",
  props:['data']
    
  
}
</script>

<style scoped>

</style>
