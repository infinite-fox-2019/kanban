<template>
  <div>
    <v-app>
      <loading
        :active.sync="isLoading"
        color="#b93281"
        :height="185"
        :width="210"
        :can-cancel="false"
        loader="bars"
      ></loading>
      <div>
        <AddKanban @addKanban="createKanban"></AddKanban>
      </div>
      <p class="announce">
        <i class="fas fa-info-circle"></i> <b> Click</b> or <b>drag</b> to change status of kanban
      </p>
      <v-flex class="setBoard">
        <div v-for="kanban in kanbans" :key="kanban.header">
          <KanbanBox
            :header="kanban.header"
            :color="kanban.color"
            :datas="kanban.datas"
            :status="kanban.status"
            @changeStatus="changeStatus"
          ></KanbanBox>
        </div>
      </v-flex>
    </v-app>
  </div>
</template>

<script>
import AddKanban from '../src/components/AddKanban.vue'
import KanbanBox from './components/KanbanBox.vue'
import db from '@/api/firestore'

export default {
  name: 'App',
  components: {
    AddKanban,
    KanbanBox
  },
  data () {
    return {
      isLoading: false,
      page: 'home',
      kanbans: {
        backLog: {
          header: 'Back Log',
          color: '#cc6889',
          datas: [],
          status: 'back-log'
        },
        todo: { header: 'Todo', color: '#A1004B', datas: [], status: 'todo' },
        inProgress: {
          header: 'In Progress',
          color: '#b74998',
          datas: [],
          status: 'in-progress'
        },
        done: { header: 'Done', color: '#ad1b84', datas: [], status: 'done' }
      }
    }
  },
  methods: {
    getKanban () {
      this.isLoading = true
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
        this.kanbans.backLog.datas = backArr
        this.kanbans.todo.datas = todoArr
        this.kanbans.done.datas = doneArr
        this.kanbans.inProgress.datas = inproArr
        this.isLoading = false
      })
    },
    createKanban (input) {
      db.collection('kanban')
        .add(input)
        .then(response => {})
        .catch(err => {
          console.log(err)
        })
    },
    changeStatus (payload) {
      db.collection('kanban')
        .doc(payload.id)
        .update({
          status: payload.toStatus
        })
        .then(data => {
          // console.log("updated");
        })
        .catch(console.log)
    }
  },
  created () {
    this.getKanban()
  }
}
</script>
<style>
.announce {
  left: 45px;
  top: 70px;
  font-size: 11pt;
  position: absolute;
  color: #5C5656
}
.setBoard {
  display: flex;
  padding-left: 3px;
  padding-top: 55px;
}
</style>

<style>
</style>
