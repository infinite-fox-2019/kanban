<template>
  <v-card class="mx-auto card" max-width="344" outlined>
    <v-list-item three-line class="content">
      <v-list-item-content>
        <div class="overline mb-4">Activity</div>
        <div class="summary">
          <div class="summarized">
            <v-list-item-title class="headline mb-1">{{activity.activity.title}}</v-list-item-title>
            <v-list-item-subtitle>{{activity.activity.description}}</v-list-item-subtitle>
          </div>
          <div class="illustration">
            <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
          </div>
        </div>
        <div class="detail" v-if="showDetails">
            <v-card-text>Id: {{activity.id}}</v-card-text>
          <v-card-text>Point: {{activity.activity.point}}</v-card-text>
          <v-card-text>Status: {{activity.activity.status}}</v-card-text>
          <v-card-text>Assigned to: {{activity.activity.assignee}}</v-card-text>
        </div>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions class="buttons">
        <div class="detail-button-container" v-if="!showDetails">
            <v-btn text @click="showActivityDetails">Details</v-btn>
        </div>
        <div class="detail-buttons" v-if="showDetails">
            <v-btn text @click="deleteActivity">Delete</v-btn>
            <v-btn text @click="hideActivityDetails">Hide</v-btn>
            <v-btn text @click="advance">Advance</v-btn>
        </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import db from '@/configs/firestore'

export default {
  data: function () {
    return {
      showDetails: false
    }
  },
  props: {
    activity: Object
  },
  methods: {
    showActivityDetails: function () {
      this.showDetails = true
    },
    hideActivityDetails: function () {
      this.showDetails = false
    },
    advance: function () {
      let newStatus = ''
      switch (this.activity.activity.status) {
        case 'backLog':
          newStatus = 'toDo'
          break
        case 'toDo':
          newStatus = 'doing'
          break
        case 'doing':
          newStatus = 'done'
          break
        default:
          newStatus = 'done'
          break
      }
      db.collection('toDos').doc(this.activity.id).update({ status: newStatus })
        .then(_ => {
          console.log('successfully advanced')
          this.$emit('update-list')
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteActivity: function () {
      db.collection('cities').doc(this.activity.id).delete()
        .then(_ => {
          console.log('successfully deleted')
          this.$emit('update-list')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
.card {
  margin-bottom: 2%;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.summary {
  display: flex;
  justify-content: space-between;
}

.detail {
  display: flex;
  flex-direction: column;
}

.detail v-list-item-text {
  margin: 4px;
}

.buttons {
  display: flex;
  justify-content: center;
  margin: 15px;
}
</style>
