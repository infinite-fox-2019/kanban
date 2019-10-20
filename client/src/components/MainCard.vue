<template>
    <div>
        <div class="ml-5 mr-5">
            <b-row class="mr-10 ml-10">
                <b-col md='4'>
                    <b-card class="boardCard"
                        border-variant="danger"
                        header="TO-DO"
                        header-bg-variant="danger"
                        header-text-variant="white"
                    >
                          <div>
                          <SubCard :tasks="tasks" status="todo"></SubCard>
                          </div>
                    </b-card>
                </b-col>

                <b-col md='4'>
                    <b-card class="boardCard"
                        border-variant="warning"
                        header="Doing"
                        header-bg-variant="warning"
                        header-text-variant="white"
                    >
                          <div>
                          <SubCard :tasks="tasks" status="doing"></SubCard>
                          </div>
                    </b-card>
                </b-col>

                <b-col md='4'>
                    <b-card class="boardCard"
                        border-variant="primary"
                        header="Done"
                        header-bg-variant="primary"
                        header-text-variant="white"
                    >
                            <div>
                            <SubCard  :tasks="tasks" status="done"></SubCard>
                            </div>
                        </b-card>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
import db from '../../config/firestore.js'
import SubCard from './SubCard.vue'

export default {
  name: 'MainCard',
  components: {
    SubCard
  },
  data () {
    return {
      tasks: {
        todo: [],
        doing: [],
        done: []
      }
    }
  },
  methods: {
    start ({ originalEvent }) {
      this.controlOnStart = originalEvent.ctrlKey
    }
  },
  created () {
    db.collection('Task')
      .onSnapshot((querySnapshot) => {
        this.tasks = {
          todo: [],
          doing: [],
          done: []
        }
        let task = {}
        querySnapshot.forEach((doc) => {
          task = doc.data()
          task.id = doc.id
          if (task.status === 'todo') {
            this.tasks.todo.push(task)
            task = {}
          } else if (task.status === 'doing') {
            this.tasks.doing.push(task)
            task = {}
          } else if (task.status === 'done') {
            this.tasks.done.push(task)
            task = {}
          }
        })
      })
  }
}
</script>
<style scoped>
.boardCard {
    min-height: 400px;
}
</style>
