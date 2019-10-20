<template>
  <div class="list-group-item">
    <h4>{{item.todo}}</h4>
    <div>
     <p>oleh: {{item.name}}</p>  
    </div> 
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: 'Contents',
  components: {
    draggable
  },
  props:['item']
}
</script>

<style>

</style>
