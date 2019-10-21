<template>
  <div class="home">
    <Navbar></Navbar>
    <div class="row d-flex justify-content-center pt-5">
      <Content
        v-for="status in kanGabans"
        :key="status.name"
        v-bind:name="status.name"
        v-bind:color="status.color"
      />
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Content from '../components/Content'
import db from './db'
export default {
  name: 'home',
  components: {
    Navbar,
    Content
  },
  data() {
    return {
      kanGabans: [
        {
          name: "Back - Log",
          color: "red"
        },
        {
          name: "To - Do",
          color: "blue"
        },
        {
          name: "Doing",
          color: "yellow"
        },
        {
          name: "Done",
          color: "green"
        }
      ]
    }
  },
  created() {}
}
</script>

<style scoped>

</style>
