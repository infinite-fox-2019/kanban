<template>


  <b-col md="3" class="mb-3">
    <b-card :bg-variant="variant" text-variant="white" :header="header" class="text-center">
      <draggable :list="dataArray" group="kanban">
        <slot></slot>
      </draggable>
    </b-card>
  </b-col>


</template>

<script>
import draggable from 'vuedraggable'

export default {
  components:{
    draggable
  },
  props:['dataArray','variant','group','header']
}
</script>

<style scoped>

</style>
