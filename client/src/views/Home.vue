<template>
  <div class="home columns">
    <div v-for="board in boards" :key="board.id" class="column is-one-quarter">
      <Board :boardName="board.name">
        <div slot="board-name">
          <div :class="`notification ${board.name}-header`">
            {{ board.formattedName }}
          </div>
        </div>
      </Board>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Board from '../components/Board'

export default {
  name: 'home',
  data () {
    return {
      boards: [
        {
          id: 1,
          name: 'backlog',
          formattedName: 'Backlog'
        },
        {
          id: 2,
          name: 'todo',
          formattedName: 'To-Do'
        },
        {
          id: 3,
          name: 'doing',
          formattedName: 'Doing'
        },
        {
          id: 4,
          name: 'done',
          formattedName: 'Done'
        }
      ]
    }
  },
  components: {
    Board
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
