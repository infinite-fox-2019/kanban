<template>
  <v-card width="280" min-height="50vh" class="rounded-card">
    <v-toolbar flat id="title" min-height="80">
      <div class="header">
        <h1 :style="{color: color}">{{header}}</h1>
      </div>
      <v-toolbar-title class="white--text font-weight-bold"></v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <draggable v-model="items" group="todo" @start="drag=true" @end="drag=false">
        <div v-for="item in items" :key="item.id">
          <card-kanban
            :title="item.title"
            :id="item.id"
            :description="item.description"
            :status="item.status"
            :assignTo="item.assignTo"
            :createdAt="item.createdAt"
          ></card-kanban>
        </div>
      </draggable>
    </v-card-text>
  </v-card>
</template>

<script>
import CardKanban from './CardKanban.vue'
import draggable from 'vuedraggable'
export default {
  data () {
    return {
      items: []
    }
  },
  props: {
    header: { type: String },
    color: { type: String },
    datas: { type: Array },
    status: { type: String }
  },
  components: {
    CardKanban,
    draggable
  },
  mounted () {},
  watch: {
    datas () {
      this.items = this.datas
    },
    items () {
      for (let i in this.items) {
        if (this.items[i].status !== this.status) {
          let id = this.items[i].id
          let status = this.status
          this.$emit('changeStatus', { id: id, toStatus: status })
          // db.collection("task").doc(this.datas[i].id)
          //   .update({
          //     status: this.status
          //   })
          //   .then((data) => {
          //     console.log('Success');
          //   })
          //   .catch(console.log);
        }
      } // let diff = newVal.diff( oldVal );
      // if(diff.length > 0 && diff[0].id){
      // }
    }
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Nunito&display=swap");
.rounded-card {
  min-height: 62vh !important;
  border-radius: 8px;
  margin-left: 40px;
  margin-top: 127px;
}
#container {
  display: flex;
  justify-content: center;
  padding-top: 30px;
}

#title {
  letter-spacing: 2px;
}
.header {
  margin: 0 auto;
}
h1 {
  color: white;
  font-size: 28px;
  font-family: "Nunito", sans-serif;
  margin-top: 23px;
}
</style>
