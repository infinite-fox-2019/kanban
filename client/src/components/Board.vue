<template>
  <div class="container">
    <div class="notification">
      <slot class="list-group board-name" name="board-name" group="people" @change="log"></slot>
      <draggable :list="list" @change="log">
        <div
          class="list-group-item"
          v-for="(element, index) in list"
          :key="element.name"
        >
          <Task :name="element.name" :point="element.point" :assignedTo="element.assignedTo" :order="index"></Task>
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
// import db from '../config/firestore'

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
      this.list.push(payload)
      this.showAdd = false
    },
    setShowAdd: function () {
      this.showAdd = !this.showAdd
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
    },
    populateList () {
      // let docRef = db.collection('boards').doc(this.boardName)
      // docRef.onSnapshot(doc => {
      //   this.list = doc.data().tasks
      // })
    },
    updateList () {
      // db.collection('boards').doc(this.boardName).set({
      //   tasks: this.list
      // })
      //   .then(function () {
      //     console.log('Document successfully written!')
      //   })
      //   .catch(function (error) {
      //     console.error('Error writing document: ', error)
      //   })
    }
  },
  created () {
    this.populateList()
  },
  watch: {
    list () {
      this.updateList()
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
