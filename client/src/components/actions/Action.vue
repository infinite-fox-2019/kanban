<template>
  <div>
    <b-button href="#" variant="primary" class='detail' @click='left(takeName)'>Left</b-button>
    <b-button href="#" variant="primary" class='detail' @click='alertDisplay'>Delete</b-button>
    <b-button href="#" variant="primary" class='detail' @click='right(takeName)'>Right</b-button>
  </div>
</template>

<script>
import db from '../../../config/firebase'
import swal from 'sweetalert2'

export default {
  props: ['takeId', 'takeName'],
  data () {
    return {
      dataAll: ['backlog', 'todo', 'doing', 'done']
    }
  },
  methods: {
    alertDisplay () {
      this.$swal({
        title: 'Are you sure?',
        text: 'You can\'t revert your action',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes Delete it!',
        cancelButtonText: 'No, Keep it!',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        if (result.value) {
          db.collection('kamvan')
            .doc(this.takeId)
            .delete()
            .then(() => {
              this.$swal('Deleted', 'You successfully deleted this file', 'success')
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          swal.fire({
            type: 'info',
            title: 'Cancelled',
            text: 'Your file is still intact'
          })
        }
      })
    },
    left (name) {
      for (let i = 0; i < this.dataAll.length; i++) {
        if (this.dataAll[i] === name && this.dataAll[i - 1] !== undefined) {
          this.$emit('sendchangeleft', this.dataAll[i - 1])
          break
        }
      }
    },
    right (name) {
      for (let i = 0; i < this.dataAll.length; i++) {
        if (this.dataAll[i] === name && this.dataAll[i + 1] !== undefined) {
          this.$emit('sendchangeright', this.dataAll[i + 1])
          break
        }
      }
    }
  }
}
</script>

<style>

</style>
