<template>
   <div class="boardTitle">
      <h2>{{ title }}</h2>

      <div class="text-center">
        <a href="" class="myBtn" data-toggle="modal" :data-target="'#'+title"><i class="far fa-plus-square"></i></a>
      </div>

      <modal :status="title"/>
    </div>
</template>

<script>
import modal from './modal.vue'

export default {
  components: {
    modal
  },
  data () {
    return {

    }
  },
  props: ['title'],
  methods: {

  }

}
</script>

<style>
.boardTitle {
  background-color: rgba(255, 255, 255, 0.90);
  box-shadow: 3px 11px 14px -5px rgba(0,0,0,0.20);
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 15px 0;
}

.boardTitle h2 {
  font-size: 20px;
}

.mtBtn{
  width: 1px;
  height: 1px;
  background-color: aqua;
}
</style>
