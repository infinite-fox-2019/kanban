<template>
  <div class='card'>
       <b-card
        border-variant="danger"
        header="Back-Log"
        header-bg-variant="danger"
        header-text-variant="white"
        align="left"
      >
        <draggable class="list-group" :list="fetchBacklog" group="people">
          <div
            class='main-container'
            v-for='(backlog, index) in fetchBacklog' :key='index'>
            <ContBacklog :getbacklog='backlog' @sendchangeleftoparent='gotItChangeLeft' @sendchangerightoparent='gotItChangeRight'/>
          </div>
        </draggable>
      </b-card>
  </div>
</template>

<script>
import ContBacklog from './ContBacklog'
import draggable from 'vuedraggable'

export default {
  components: {
    ContBacklog,
    draggable
  },
  props: ['fetchBacklog'],
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
