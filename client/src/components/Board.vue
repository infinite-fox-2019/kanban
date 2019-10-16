<template>
  <div class="container">
    <div class="notification">
      <slot class="board-name" name="board-name"></slot>
      <draggable class="list-group" :list="list" group="people" @change="log">
        <div
          class="list-group-item"
          v-for="(element, index) in list"
          :key="element.name"
        >
          <Task :name="element.name" :order="index"></Task>
        </div>
      </draggable>
      <div class="form-add-container">
        <div @click="setShowAdd">
          Add a task...
        </div>
        <div v-if="showAdd">
          <form @submit.prevent="add">
            <input v-model="newTaskName" class="input" type="text" placeholder="Task name">
            <button class="button add-button">
              <i class="fa fa-plus">
              </i>
            </button>
          </form>
        </div>
      </div>
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
      list: [],
      newTaskName: '',
      showAdd: false
    }
  },
  methods: {
    add: function () {
      this.list.push({ name: this.newTaskName })
      this.showAdd = false
      this.newTaskName = ''
    },
    setShowAdd: function () {
      this.showAdd = true
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
.form-add-container {
  display: flex;
  flex-direction: column;
}
.form-add-container div {
  margin-top: 8px;
}
.add-button {
  float: right;
  background-color: #1F2940;
  border: none;
  color: white;
}
.add-button:hover {
  float: right;
  background-color: #1F2940;
  border: none;
  color: rgb(223, 223, 223);
}
</style>
