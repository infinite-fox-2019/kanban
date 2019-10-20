<template>
    <div>
        <Navbar></Navbar>
        <MainCard></MainCard>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import MainCard from '../components/MainCard.vue'

export default {
  name: 'Dashboard',
  components: {
    Navbar,
    MainCard
  }
}
</script>
