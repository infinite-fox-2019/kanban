<template>
  <div class='card'>
       <b-card
        border-variant="primary"
        header="Doing"
        header-bg-variant="primary"
        header-text-variant="white"
        align="left"
      >
          <draggable class="list-group" :list="fetchDoing" group="people">
            <div class='main-container' v-for='(doing,index) in fetchDoing' :key='index'>
              <ContDoing :getDoing='doing' @sendchangeleftoparent='gotItChangeLeft' @sendchangerightoparent='gotItChangeRight'/>
            </div>
          </draggable>
      </b-card>
  </div>
</template>

<script>
import ContDoing from './ContDoing'
import draggable from 'vuedraggable'

export default {
  components: {
    ContDoing,
    draggable
  },
  props: ['fetchDoing'],
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
