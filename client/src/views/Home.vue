<template>
<div>
  <Nav />
  <div class='home'>
    <div class="row">
      <div class="col-3">
        <Card name='danger' title='Back-Log'/>
      </div>
      <div class="col-3">
        <Card name='warning' title='To-Do'/>
      </div>
      <div class="col-3">
        <Card name='primary' title='Doing'/>
      </div>
      <div class="col-3">
        <Card name='success' title='Done'/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import Nav from '../components/Nav'
import Card from '../components/Card'
import db from '../../config/firebase'

export default {
  name: 'home',
  components: {
    Nav,
    Card
  },
  data () {
    return {
      name: '',
      firstData: '',
      default: false
    }
  },
  created () {
    db.collection('kamvan').get()
      .then(doc => {
        console.log(doc.docs[0].data())
        this.firstData = doc.docs[0].data()
        this.default = true
      })
  },
  watch: {
    firstData () {
      if (this.default) {
        this.name = 'danger'
      }
    }
  }
}
</script>

<style scoped>
.home{
  background-color:gold;
  padding: 15px;
}
</style>
