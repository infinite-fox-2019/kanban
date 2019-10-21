<template>
<div>
  <Nav @sendtoparrent='getfromchild'/>
  <div class='home'>
    <div class="row">
      <div class="col-3">
        <Backlog :fetchBacklog='backlogs' @sendleftobigparent='bigParentGotleft' @sendrightobigparent='bigParentGitright'/>
      </div>
      <div class="col-3">
        <Todo :fetchTodos='todos' @sendleftobigparent='bigParentGotleft' @sendrightobigparent='bigParentGitright'/>
      </div>
      <div class="col-3">
        <Doing :fetchDoing='doing' @sendleftobigparent='bigParentGotleft' @sendrightobigparent='bigParentGitright'/>
      </div>
      <div class="col-3">
        <Done :fetchDone='done' @sendleftobigparent='bigParentGotleft' @sendrightobigparent='bigParentGitright'/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import Nav from '../components/Nav'
import Backlog from '../components/Backlog'
import Todo from '../components/Todo'
import Doing from '../components/Doing'
import Done from '../components/Done'
import db from '../../config/firebase'

export default {
  name: 'home',
  components: {
    Nav,
    Backlog,
    Todo,
    Doing,
    Done
  },
  data () {
    return {
      name: '',
      backlogs: '',
      todos: '',
      doing: '',
      done: ''

    }
  },
  methods: {
    getfromchild (data) {
      this.backlogs = data
    },
    bigParentGotleft (name) {
      console.log(name)
      if (name !== 'backlog') {
        db.collection('kamvan').update({ name: 'backlog' })
      }
    },
    bigParentGitright (name) {
      this.name = name
    }
  },
  created () {
    db.collection('kamvan').where('name', '==', 'backlog')
      .onSnapshot((querySnapshot) => {
        let temp = []
        querySnapshot.forEach((doc) => {
          let id = doc.id
          let data = doc.data()
          data.id = id
          temp.push(data)
        })
        this.backlogs = temp
      })
    db.collection('kamvan').where('name', '==', 'todo')
      .onSnapshot((querySnapshot) => {
        let temp = []
        querySnapshot.forEach((doc) => {
          let id = doc.id
          let data = doc.data()
          data.id = id
          temp.push(data)
        })
        this.todos = temp
      })
    db.collection('kamvan').where('name', '==', 'doing')
      .onSnapshot(querySnapshot => {
        let temp = []
        querySnapshot.forEach(doc => {
          let id = doc.id
          let data = doc.data()
          data.id = id
          temp.push(data)
        })
        this.doing = temp
      })
    db.collection('kamvan').where('name', '==', 'done')
      .onSnapshot(querySnapshot => {
        let temp = []
        querySnapshot.forEach(doc => {
          let id = doc.id
          let data = doc.data()
          data.id = id
          temp.push(data)
        })
        this.done = temp
      })
  },
  watch: {
    backlogs (val) {
      val.forEach(el => {
        if (el.name !== 'backlog') {
          db.collection('kamvan').doc(el.id).update({ name: 'backlog' })
        }
      })
    },
    todos (val) {
      val.forEach(el => {
        if (el.name !== 'todo') {
          db.collection('kamvan').doc(el.id).update({ name: 'todo' })
        }
      })
    },
    doing (val) {
      val.forEach(el => {
        console.log(el)
        if (el.name !== 'doing') {
          db.collection('kamvan').doc(el.id).update({ name: 'doing' })
        }
      })
    },
    done (val) {
      val.forEach(el => {
        console.log(el)
        if (el.name !== 'done') {
          db.collection('kamvan').doc(el.id).update({ name: 'done' })
        }
      })
    }
  }
}
</script>

<style scoped>
.home{
  padding: 15px;
  height:200px
}
</style>
