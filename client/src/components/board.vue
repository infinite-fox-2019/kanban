<template>

   <div class="d-flex flex-column w-25 mx-3">
      <boardtitle :title="title" />
      <div class="boardbody">
        <!-- <draggable group="people" @start="drag=true" @end="drag=false"> -->
          <draggable class="list-group" :list="tasks" group="people" @change="log">
            <task v-for="(task, index) in tasks" :key="index" :task="task" :baseColor="baseColor"/>
         </draggable>
      </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import boardtitle from '../components/boardtitle.vue'
import task from '@/components/task.vue'
import db from '@/config/fireStore.js'

export default {
  components: {
    boardtitle,
    task,
    draggable
  },
  data () {
    return {
      tasks: []
    }
  },
  props: ['title', 'baseColor'],
  methods: {
    getTask () {
      db.collection('task').where('status', '==', this.title)
        .onSnapshot(doc => {
          let result = []
          doc.docs.forEach(el => {
            let task = {
              id: el.id,
              title: el.data().title,
              description: el.data().description,
              status: el.data().status
            }
            result.push(task)
          })
          this.tasks = result
        })
    },
    log: function (evt) {
      window.console.log(evt)
    }
  },
  created () {
    this.getTask()
  },
  watch: {
    tasks: function () {
      this.tasks.forEach(task => {
        if (task.status !== this.title) {
          db.collection('task')
            .doc(task.id)
            .update({
              status: this.title
            })
            .then(() => {
              console.log('success update')
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    }
  }

}
</script>

<style>

.boardbody {
    width: 100%;
    background-color: rgb(255, 255, 255);
    padding: 15px;
    box-shadow: 3px 11px 14px -5px rgba(0,0,0,0.20);
    min-height: 100px;
    border-radius: 15px 0;
}

</style>
