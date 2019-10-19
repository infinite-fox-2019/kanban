<template>
  <div>

    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="#" variant="light"><strong>KanBan</strong></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-button v-b-modal.new-task-modal size="sm" class="my-2 my-sm-0" variant="light">Create Task</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-modal
      centered
      id="new-task-modal"
      title="Add New Task"
      ref="modal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Title"
          label-for="title-input"
        >
          <b-form-input
            id="title-input"
            v-model="modal_form.title"
            placeholder="Task title"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Description"
          label-for="desc-input"
        >
          <b-form-textarea
            id="desc-input"
            v-model="modal_form.desc"
            placeholder="Task description..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>
        <b-form-group
          label="Assign To"
          label-for="assign-input"
        >
          <b-form-input
            id="assign-input"
            v-model="modal_form.assign"
            placeholder="Enter your name"
          ></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>

    <b-container class="mt-5">
      <b-row>
        <b-col>
          <Cardstatus title="Back-log" variant="danger" :list="status.backlog" @delete="delTask"/>
        </b-col>
        <b-col>
          <Cardstatus title="To-Do" variant="warning" :list="status.todo" @delete="delTask"/>
        </b-col>
        <b-col>
          <Cardstatus title="Doing" variant="primary" :list="status.doing" @delete="delTask"/>
        </b-col>
        <b-col>
          <Cardstatus title="Done" variant="success" :list="status.done" @delete="delTask"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import db from '../../config/firestore'
import Cardstatus from '@/components/Cardstatus.vue'

export default {
  name: 'kanban',
  components: {
    Cardstatus
  },
  data () {
    return {
      status: {
        backlog: [],
        todo: [],
        doing: [],
        done: []
      },
      modal_form: {
        title: '',
        desc: '',
        assign: ''
      }
    }
  },
  methods: {
    fetchTask: function () {
      db
        .collection('tasks')
        .onSnapshot((querySnapshot) => {
          let arrBackLog = []
          let arrTodo = []
          let arrDoing = []
          let arrDone = []
          querySnapshot.docs.forEach(task => {
            let taskObj
            switch (task.data().status) {
              case 'backlog':
                taskObj = task.data()
                taskObj.id = task.id
                arrBackLog.push(taskObj)
                break
              case 'todo':
                taskObj = task.data()
                taskObj.id = task.id
                arrTodo.push(taskObj)
                break
              case 'doing':
                taskObj = task.data()
                taskObj.id = task.id
                arrDoing.push(taskObj)
                break
              case 'done':
                taskObj = task.data()
                taskObj.id = task.id
                arrDone.push(taskObj)
                break
            }
          })
          this.status.backlog = arrBackLog
          this.status.todo = arrTodo
          this.status.doing = arrDoing
          this.status.done = arrDone
        })
    },
    delTask: function (id) {
      db.collection('tasks').doc(id).delete()
    },
    resetModal () {
      this.modal_form.title = ''
      this.modal_form.desc = ''
      this.modal_form.assign = ''
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit () {
      // Push data form to firestore database
      db.collection('tasks').add({
        title: this.modal_form.title,
        description: this.modal_form.desc,
        assign: this.modal_form.assign,
        status: 'backlog'
      })
        .then((docRef) => {
          // console.log('Document written with ID: ', docRef.id)
          // Hide the modal manually
          this.$nextTick(() => {
            this.$refs.modal.hide()
          })
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
          // Hide the modal manually
          this.$nextTick(() => {
            this.$refs.modal.hide()
          })
        })
    }
  },
  computed: {
    backlog () {
      return this.status.backlog
    },
    todo () {
      return this.status.todo
    },
    doing () {
      return this.status.doing
    },
    done () {
      return this.status.done
    }
  },
  watch: {
    backlog: function () {
      // console.log('backlog')
      this.status.backlog.forEach(task => {
        if (task.status !== 'backlog') {
          db
            .collection('tasks')
            .doc(task.id)
            .update({
              status: 'backlog'
            })
        }
      })
    },
    todo: function () {
      // console.log('todo')
      this.status.todo.forEach(task => {
        if (task.status !== 'todo') {
          db
            .collection('tasks')
            .doc(task.id)
            .update({
              status: 'todo'
            })
        }
      })
    },
    doing: function () {
      // console.log('doing')
      this.status.doing.forEach(task => {
        if (task.status !== 'doing') {
          db
            .collection('tasks')
            .doc(task.id)
            .update({
              status: 'doing'
            })
        }
      })
    },
    done: function () {
      // console.log('done')
      this.status.done.forEach(task => {
        if (task.status !== 'done') {
          db
            .collection('tasks')
            .doc(task.id)
            .update({
              status: 'done'
            })
        }
      })
    }
  },
  created () {
    this.fetchTask()
  }
}
</script>

<style>

</style>
