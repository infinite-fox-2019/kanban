<template>
  <div class="home columns">
    <div class="column">
      <Board>
        <div slot="board-name">
          <div class="notification backlog-header">
            Backlog
          </div>
        </div>
      </Board>
    </div>
    <div class="column">
      <Board>
        <div slot="board-name">
          <div class="notification todo-header">
            To-Do
          </div>
        </div>
      </Board>
    </div>
    <div class="column">
      <Board>
        <div slot="board-name">
          <div class="notification doing-header">
            Doing
          </div>
        </div>
      </Board>
    </div>
    <div class="column">
      <Board>
        <div slot="board-name">
          <div class="notification done-header">
            Done
          </div>
        </div>
      </Board>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import db from '../config/firestore'
import Board from '../components/Board'

export default {
  name: 'home',
  components: {
    Board
  },
  methods: {
    addUser () {
      console.log('masuk add user')
      db.collection('users').add({
        first: 'Ada',
        last: 'Lovelace',
        born: 1815
      })
        .then(function (docRef) {
          console.log('Document written with ID: ', docRef.id)
        })
        .catch(function (error) {
          console.error('Error adding document: ', error)
        })
    },
    getUsers () {
      db.collection('users').get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log(doc.data())
          })
        })
    }
  },
  created () {
    this.getUsers()
  }
}
</script>

<style scoped>
.home {
  margin: 20px;
}

.notification {
  padding: 10px;
  font-family: 'Bree Serif', serif;
  font-size: 18px;
  text-align: center;
}

.backlog-header {
  background-color: blue;
  background-image: linear-gradient(to bottom right, rgb(34, 110, 209), rgb(129, 214, 207));
}

.todo-header {
  background-color: red;
  background-image: linear-gradient(to bottom right, rgb(212, 0, 0), rgb(214, 129, 143));
}

.doing-header {
  background-color: yellow;
  background-image: linear-gradient(to bottom right, rgb(124, 112, 0), rgb(255, 232, 101));
}

.done-header {
  background-color: green;
  background-image: linear-gradient(to bottom right, rgb(71, 129, 43), rgb(83, 255, 120));
}
</style>
