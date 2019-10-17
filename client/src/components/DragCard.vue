<template>
    <div class="col-3">
            <b-card
                :header="name"
                header-text-variant="white"
                header-tag="header"
                style="max-width: 20rem;"
            >
            <draggable :list="list" group="people">
            <b-card-text v-for="(element) in list" :key="element.name">{{ element.name }}</b-card-text>
            </draggable>
            </b-card>
          <!-- <div
            class="list-group-item"
            v-for="(element) in list"
            :key="element.name"
          >
            {{ element.name }}
          </div> -->
        
    </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'DragCard',
  props: ['name','list'], 
  components: {
    draggable
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-header {
  background-color: #00b49d;
}
</style>
