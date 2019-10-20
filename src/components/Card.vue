<template>
  <div class="col-4">
    <b-card class="card"
      border-variant="primary"
      header=""
      header-bg-variant="primary"
      header-text-variant="white"
      align="center"
    >
    <b-card-title>{{data.name}}</b-card-title>
      <b-card-text>
        <p>{{data}}</p>
      </b-card-text>
      <draggable class="list-group" :list="data.data" group="people">
          <Contents v-for="(item, index) in data.data" :key="index" :item="item"></Contents>
      </draggable>
    </b-card>  
  </div>
</template>

<script>
import Contents from "@/components/ListTodo";
import draggable from "vuedraggable";
export default {
  name: 'CardKanban',
  components: {
    Contents,
    draggable
  }, 
  props: ['data']
}
</script>

<style>
</style>>
