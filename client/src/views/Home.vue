<template>
  <div>
    <Navbar></navbar>
    <List></list>
  </div>
</template>

<script>
import List from '../components/List'
import Navbar from '../components/Navbar'
export default {
  components: { 
    List,
    Navbar }
}
</script>

<style>
.pageTitle {
  text-align: center;
  margin-top: 40px;
}
</style>
