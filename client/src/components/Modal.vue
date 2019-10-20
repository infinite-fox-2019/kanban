<template>
  <b-card>

                <table>
                    <tr>
                        <td>
                            <small>Title</small>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type='text' v-model='title' placeholder="Task Title">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <small>Description</small>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <textarea v-model='description'></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <small>Point</small>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type='text' placeholder="0" v-model='point'>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <small>Assigned To</small>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" placeholder="Assigned To" v-model='assigned'>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button @click='cancelInput()'>Cancel</button>
                            <button @click='goSave()'>Save</button>
                        </td>
                    </tr>
                </table>
              </b-card>
</template>

<script>
import db from '../../config/firebase'

export default {
  data () {
    return {
      title: '',
      description: '',
      assigned: '',
      point: ''
    }
  },
  methods: {
    cancelInput () {
      this.$emit('changeStatus', false)
    },
    goSave () {
      const title = this.title
      const description = this.description
      const assigned = this.assigned
      const point = this.point
      db.collection('kamvan').add({
        title,
        description,
        assigned,
        point,
        name: 'backlog'
      })
        .then((doc) => {
          db.collection('kamvan')
            .onSnapshot((querySnapshot) => {
              let temp = []
              querySnapshot.forEach((doc) => {
                let id = doc.id
                let data = doc.data()
                data.id = id
                temp.push(data)
              })
              this.$emit('sendtobacklog', temp)
              this.title = ''
              this.description = ''
              this.point = 0
              this.assigned = ''
            })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
