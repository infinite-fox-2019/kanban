<template>

  <b-col md="3">
    <b-card bg-variant="secondary" text-variant="white" header="Secondary" class="text-center">
      <draggable :list="list1" group="kanban">

      </draggable>
    </b-card>
  </b-col>

</template>

<script>
// import Card from '@/components/Card.vue'
import draggable from 'vuedraggable'

export default {
  name: 'kanban-card',
  components: {
    // Card,
    draggable
  },
  data () {
    return {
      list1: [
        { name: 'John', id: 1 },
        { name: 'Joao', id: 2 },
        { name: 'Jean', id: 3 },
        { name: 'Gerard', id: 4 }
      ],
      list2: [
        { name: 'Juan', id: 5 },
        { name: 'Edgard', id: 6 },
        { name: 'Johnson', id: 7 }
      ]
    }
  }
}
</script>

<style scoped>

</style>
