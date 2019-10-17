<template>
  <div class="container">
    <div class="home row">
      <div class="col-3">
        <BackLogCard />
      </div>
      <div class="col-3">
        <TodoCard />
      </div>
      <div class="col-3">
        <DoingCard />
      </div>
      <div class="col-3">
        <DoneCard />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BackLogCard from '@/components/BackLogCard.vue'
import TodoCard from '@/components/TodoCard.vue'
import DoingCard from '@/components/DoingCard.vue'
import DoneCard from '../components/DoneCard.vue'
import db from '../../config/firestore'

export default {
  name: 'home',
  components: {
    BackLogCard,TodoCard,DoingCard,DoneCard
  }
  // ,
  // created(){
  //   db.collection("users").add({
  //       first: "arnold",
  //       last: "therigan",
  //       born: 1997
  //   })
  //   .then(function(docRef) {
  //       console.log("Document written with ID: ", docRef.id);
  //   })
  //   .catch(function(error) {
  //       console.error("Error adding document: ", error);
  //   });
  // }
}
</script>
