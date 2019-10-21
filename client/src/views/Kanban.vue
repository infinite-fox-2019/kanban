<template>
 <div>
   <h1 style="font-size: 100px;">Kanban</h1>
    <div class="d-flex mx-3">
    <board v-for="(board, index) in kanbanBoard" :key="index" :title="board" :baseColor="baseColor[index]"/>
  </div>
 </div>
</template>

<script>
import board from '@/components/board.vue'

export default {
  components: {
    board
  },
  data () {
    return {
      kanbanBoard: ['Back-log', 'Todo', 'Doing', 'Done'],
      baseColor: ['242, 5, 5', '242, 214, 5', '53, 166, 222', '53, 222, 67']
    }
  }
}
</script>

<style>

.boardbody{
 width: 100%;
 background-color: rgb(255, 255, 255);
 padding: 15px;
 box-shadow: 3px 11px 14px -5px rgba(0,0,0,0.20);
 min-height: 100px;
 border-radius: 15px 0;
}
</style>
