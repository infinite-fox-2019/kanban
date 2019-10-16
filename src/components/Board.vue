<template>
  <div class="container">
    <div class="notification">
      <slot class="board-name" name="board-name"></slot>
      <draggable class="list-group" :list="list1" group="people" @change="log">
        <div
          class="list-group-item"
          v-for="(element, index) in list1"
          :key="element.name"
        >
          <Task :name="element.name" :order="index"></Task>
        </div>
      </draggable>
    </div>
  </div>
</template>
<script>
import draggable from '../../node_modules/vuedraggable'
import Task from './Task.vue'

export default {
  name: 'board',
  display: 'Board',
  order: 1,
  components: {
    draggable,
    Task
  },
  data () {
    return {
      list1: [
        { name: 'John', id: 1 },
        { name: 'Joao', id: 2 },
        { name: 'Jean', id: 3 },
        { name: 'Gerard', id: 4 }
      ]
    }
  },
  methods: {
    add: function () {
      this.list.push({ name: 'Juan' })
    },
    replace: function () {
      this.list = [{ name: 'Edgard' }]
    },
    clone: function (el) {
      return {
        name: el.name + ' cloned'
      }
    },
    log: function (evt) {
      window.console.log(evt)
    }
  }
}
</script>

<style scoped>
.notification {
  background: #1F2940;
  padding: 10px;
}
</style>
