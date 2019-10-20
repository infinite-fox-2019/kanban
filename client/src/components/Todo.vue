<template>
  <div class='card'>
       <b-card
        border-variant="warning"
        header="To-Do"
        header-bg-variant="warning"
        header-text-variant="white"
        align="left"
      >
        <draggable class="list-group" :list="fetchTodos" group="people">
          <div class='main-container' v-for='(todo, index) in fetchTodos' :key='index'>
            <ContTodo :getodo='todo' @sendchangeleftoparent='gotItChangeLeft' @sendchangerightoparent='gotItChangeRight'/>
          </div>
        </draggable>
      </b-card>
  </div>
</template>

<script>
import ContTodo from './ContTodo'
import draggable from 'vuedraggable'

export default {
  components: {
    ContTodo,
    draggable
  },
  props: ['fetchTodos'],
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
