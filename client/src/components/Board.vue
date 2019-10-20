<template>
  <div class="container">
    <div class="notification">
      <slot class="board-name" name="board-name"></slot>
      <draggable class="list-group" :list="list" group="people">
        <div
          class="list-group-item"
          v-for="(element, index) in list"
          :key="element.name"
        >
          <Task :name="element.name" :point="element.point" :assignedTo="element.assignedTo" :order="index" @deleteTask="deleteTask"></Task>
        </div>
      </draggable>
      <div class="form-add-container">
        <div @click="setShowAdd" class="add-task-clickable">
          Add a task...
        </div>
        <TaskForm v-if="showAdd" @addtask="add"></TaskForm>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from '../../node_modules/vuedraggable'
import Task from './Task.vue'
import TaskForm from './TaskForm'
import db from '../config/firestore'

export default {
  name: 'board',
  display: 'Board',
  order: 1,
  components: {
    draggable,
    Task,
    TaskForm
  },
  data () {
    return {
      list: [],
      showAdd: false
    }
  },
  props: {
    boardName: String
  },
  methods: {
    add (payload) {
      let hasEmpty = false
      for (let field in payload) {
        if (!payload[field]) {
          hasEmpty = true
        }
      }
      if (!hasEmpty) {
        this.list.push(payload)
        this.showAdd = false
      }
    },
    deleteTask (index) {
      this.list.splice(index, 1)
    },
    setShowAdd: function () {
      this.showAdd = !this.showAdd
    },
    populateList () {
      let docRef = db.collection('boards').doc(this.boardName)
      docRef.onSnapshot(doc => {
        if (JSON.stringify(this.list) !== JSON.stringify(doc.data().tasks)) {
          this.list = doc.data().tasks
        }
      })
    }
  },
  created () {
    this.populateList()
  },
  watch: {
    list () {
      db.collection('boards').doc(this.boardName).set({
        tasks: this.list
      })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
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
.add-task-clickable {
  cursor: pointer;
}
</style>
