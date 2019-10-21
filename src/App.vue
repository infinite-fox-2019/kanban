<template>
  <v-app>
    <v-content>
      <Header @show-form="showSubmitForm"></Header>
      <div class="board-container">
        <ProgressBoard class="board" v-for="(board, index) in boards" :key="index"
        :board="board"
        :activities="activities"
        @update-list="updateActivities"
        ></ProgressBoard>
      </div>
      <Form v-if="showForm" @hide-form="hideSubmitForm"></Form>
    </v-content>
  </v-app>
</template>

<script>
import db from '@/configs/firestore'
import Header from '@/components/Header'
import ProgressBoard from '@/components/ProgressBoard'
import Form from '@/components/Form'

export default {
  name: 'App',
  components: {
    Header,
    ProgressBoard,
    Form
  },
  data: () => ({
    boards: [
      {
        title: 'Back-Logs',
        req: 'backLog'
      },
      {
        title: 'To-Do',
        req: 'toDo'
      },
      {
        title: 'Doing',
        req: 'doing'
      },
      {
        title: 'Done',
        req: 'done'
      }
    ],
    activities: [],
    showForm: false
  }),
  methods: {
    showSubmitForm: function () {
      this.showForm = true
    },
    hideSubmitForm: function () {
      this.showForm = false
    },
    getActivities: function () {
      db.collection('toDos')
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.activities.push({
              activity: doc.data(),
              id: doc.id
            })
          })
        })
    },
    updateActivities: function () {
      // this.activities = []
      // this.getActivities()
    }
  },
  created: function () {
    this.getActivities()
  }
}
</script>

<style scoped>
.board-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 4% 0%;
}

.board {
  width: 20vw;
  margin: 0% 1%;
}
</style>
