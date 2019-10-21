<template>
  <div>
    <b-button id="show-btn" @click="$bvModal.show('bv-modal-example')">New Task</b-button>
    <b-modal id="bv-modal-example" title="add New Task" hide-footer>
      <form v-on:submit.prevent="add">
        <div class="form-group">
          <label for="exampleInputEmail1">Title</label>
          <input type="text" class="form-control" placeholder="Enter Title" v-model="title" />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Description</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="description"
            v-model="description"
          />
        </div>
        <div class="d-flex justify-content-end">
          <button type="submit" class="btn btn-primary">Add</button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import db from '../views/db'
import firebase from 'firebase'
export default {
  data () {
    return {
      title: '',
      description: '',
      point: 0,
      assigned: ''
    }
  },
  components: {},
  methods: {
    add () {
      let { title, description, assigned, point } = this
      db.collection('kanban')
        .add({
          title,
          description,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          status: 'Back - Log'
        })
        .then((docRef) => {
          this.title = ''
          this.description = ''
          console.log('berhasil add data')
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
