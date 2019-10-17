<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <nav class="navbar navbar-light bg-light">
          <a class="navbar-brand" href="#">
            <img src="https://image.flaticon.com/icons/png/512/1654/1654324.png" width="30" height="30" class="d-inline-block align-top" alt="">
            Kanban
          </a>
        </nav>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
          </ul>
          <AddTask/>
        </div>
      </nav>
</template>

<script>
import AddTask from '@/components/AddTask.vue'

export default {
  components: {
    AddTask
  }
}
</script>

<style>

</style>
