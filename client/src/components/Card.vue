<template>
  <div class='card'>
       <b-card
        :border-variant="name"
        :header="title"
        :header-bg-variant="name"
        :header-text-variant="white"
        align="left"
      >
        <div class='main-container'>
          <InsideCard />
        </div>
      </b-card>
      {{firstData}}
  </div>
</template>

<script>
import InsideCard from './InsideCard'

export default {
  props: ['name', 'title', 'description'],
  components: {
    InsideCard
  }
}
</script>

<style>
.main-container{
  padding:5px;
}
.row-text{
  display: flex;
  flex-direction: column
}
.detail{
  margin:5px 15px;
}
</style>
