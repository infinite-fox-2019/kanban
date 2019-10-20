<template>
  <div class='card'>
       <b-card
        border-variant="success"
        header="Done"
        header-bg-variant="success"
        header-text-variant="white"
        align="left"
      >
        <draggable class="list-group" :list="fetchDone" group="people">
          <div class='main-container' v-for='(done, index) in fetchDone' :key="index">
            <ContDone :getDone='done' @sendchangeleftoparent='gotItChangeLeft' @sendchangerightoparent='gotItChangeRight'/>
          </div>
        </draggable>
      </b-card>
  </div>
</template>

<script>
import ContDone from './ContDone'
import draggable from 'vuedraggable'

export default {
  components: {
    ContDone,
    draggable
  },
  props: ['fetchDone'],
  methods: {
    gotItChangeLeft (name) {
      this.$emit('sendleftobigparent', name)
    },
    gotItChangeRight (name) {
      this.$emit('sendrightobigparent', name)
    }
  }
}
</script>

<style>
.main-container{
  padding:5px;
}
.row-text{
  display: flex;
  flex-direction: column
}
.detail{
  margin:5px 15px;
}
</style>
