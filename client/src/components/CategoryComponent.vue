<template>

  <div class="container">

    <div class="card-deck mb-3 text-center">
      <div class="card mb-4 shadow-sm">
        <div v-bind:style="{backgroundColor:warna}" class="card-header">

          <h4 class="my-0 font-weight-normal">{{category}}</h4>

        </div>
          <TaskComponent
          v-for="taskItem in dataParent" :key="taskItem.id"
          :taskItem="taskItem"
          />
      </div>

    </div>
  </div>
</template>

<script>
import TaskComponent from '../components/TaskComponent'
export default {
  props: ['all', 'category', 'dataParent', 'warna'],
  components: {
    TaskComponent
  },
  created () {

  }
}
</script>

<style>

</style>
