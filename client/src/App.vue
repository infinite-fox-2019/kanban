<template>
<div>
  <v-app>
    <div>
    <AddKanban @addKanban="createKanban"></AddKanban>
    </div>
    <v-flex class="setBoard">
      <div v-for="kanban in kanbans" :key="kanban.header" >
        <KanbanBox :header="kanban.header" :color="kanban.color"  :datas="kanban.datas">
        </KanbanBox>
      </div>
    </v-flex>
  </v-app>
</div>
</template>

<script>
import AddKanban from '../src/components/AddKanban.vue'
import KanbanBox from './components/KanbanBox.vue'
// import db from '@/api/firebase'
import db from '@/api/firestore'

export default {
  name: 'App',
  components: {
    AddKanban, KanbanBox
  },
  data: () => ({
    page: 'home',
    kanbans: {
      backLog: { header: 'Back Log', color: '#cc6889', datas: [] },
      todo: { header: 'Todo', color: '#A1004B', datas: [] },
      inProgress: { header: 'In Progress', color: '#b74998', datas: [] },
      done: { header: 'Done', color: '#ad1b84', datas: [] }
    }
  }),
  methods: {
    getKanban () {
      db.collection('kanban').onSnapshot(querySnapshot => {
        let sortKanban = []
        let doneArr = []
        let inproArr = []
        let todoArr = []
        let backArr = []
        for (let k in querySnapshot.docs) {
          let kanban = querySnapshot.docs[k].data()
          kanban.id = querySnapshot.docs[k].id
          sortKanban.push(kanban)
        }
        sortKanban.sort((a, b) => {
          return b.createdAt.seconds - a.createdAt.seconds
        })
        sortKanban.forEach(el => {
          if (el.status === 'back-log') {
            backArr.push(el)
          } else if (el.status === 'todo') {
            todoArr.push(el)
          } else if (el.status === 'in-progress') {
            inproArr.push(el)
          } else if (el.status === 'done') {
            doneArr.push(el)
          }
        })
        console.log(doneArr)
        this.kanbans.backLog.datas = backArr
        this.kanbans.todo.datas = todoArr
        this.kanbans.done.datas = doneArr
        this.kanbans.inProgress.datas = inproArr
      })
    },
    createKanban (input) {
      db.collection('kanban').add(input)
        .then(response => {
          console.log(response)
          console.log(response.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  created () {
    this.getKanban()
  }
}
</script>
<style>
  .setBoard{
    display: flex;
    padding-top: 30px;
    padding-left: 3px;
  }
</style>

<style>

</style>
