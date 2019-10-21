<template>
  <v-card>
    <v-card-title>{{board.title}}</v-card-title>
    <Activity
    v-for="(activity, index) in activities" :key="index" :activity="activity"
    @update-list="updateList"
    >
    ></Activity>
  </v-card>
</template>

<script>
import Activity from '@/components/Activity'
import db from '@/configs/firestore'
export default {
  data: function () {
    return {
      activities: []
    }
  },
  components: {
    Activity
  },
  props: {
    board: Object
    // activities: Array
  },
  methods: {
    updateList: function () {
      this.$emit('update-list')
    }
  },
  watch: {
    /* activities: function (oldActivities, newActivities) {
      console.log('IASIP')
      const array = []
      if (this.activities.length > 0) {
        for (let i = 0; i < this.activities.length; i++) {
          if (this.activities[i].activity.status === this.board.req) {
            array.push(this.activities[i])
          }
        }
      }
      this.sorted = array
    } */
  },
  created: function () {
    db.collection('toDos').where('status', '==', this.board.req)
      .onSnapshot((querySnapshot) => {
        var acts = []
        querySnapshot.forEach(function (doc) {
          acts.push({
            activity: doc.data(),
            id: doc.id
          })
        })
        this.activities = acts
      })
    console.log(this.activities.length)
  }
}
</script>

<style>
</style>
