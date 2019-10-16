<template>
  <v-card width="280" min-height="50vh" class="rounded-card">
    <v-toolbar flat id="title" min-height="80">
      <div class="header" >
      <h1 :style="{color: color}">{{header}}</h1>
      </div>
      <v-toolbar-title class="white--text font-weight-bold"></v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <div v-for="data in datas" :key="data.title">
        <card-kanban :title="data.title" :id="data.id"
        :description="data.description"
        :status="data.status" :assignTo="data.assignTo"
        :createdAt="data.createdAt">
        </card-kanban>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import CardKanban from './CardKanban.vue'

export default {
  props: {
    header: { type: String },
    color: { type: String },
    datas: { type: Array }
  },
  components: {
    CardKanban
  },
  mounted () {}
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Nunito&display=swap');
.rounded-card {
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
.header{
  margin: 0 auto
}
h1{
  color: white;
  font-size: 28px;
  font-family: 'Nunito', sans-serif;
  margin-top: 23px;
}
</style>
