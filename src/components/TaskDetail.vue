<template>
  <div class="card card-bordered">
      <button @click="showDetails">ShowDetails</button>
    <div v-for="(item, index) in arrItem" v-bind:key="index">
        <h1>{{item}}</h1>
    </div>
  </div>

</template>

<script>
import db from '../config/firestore'
export default {
  data: () => {
    return {
      arrItem: []
    }
  },
  methods: {
    showDetails () {
      db.collection('lists')
        .onSnapshot(querySnapshot => {
          console.log(querySnapshot)
          querySnapshot.forEach(doc => {
            console.log(doc)
            this.arrItem.push(doc.data())
          })
        })
    }
  },
  created () {

  }
}
</script>

<style>

</style>
