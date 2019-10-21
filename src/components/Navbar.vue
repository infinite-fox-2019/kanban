<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand class="titleFont" href="#">DipadanaTheReactiveKanban</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#"></b-nav-item>
          <b-nav-item href="#" disabled>V.0.1</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-button v-b-modal.modal-prevent-closing size="sm" class="my-2 my-sm-0" variant="light" type="submit">Add task</b-button>
          <!-- <b-button @click="login" size="sm" class="my-2 my-sm-0 ml-2" variant="light" type="submit">Login</b-button> -->

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

      <Modals @dataFromForm="dataFromForm"></Modals>

    </div>
</template>

<script>
import Modals from '@/components/Modals.vue'

export default {
  name: 'navbar',
  components: {
    Modals
  },
  methods: {
    dataFromForm (title, description, status) {
      this.$emit('dataFromForm', title, description, status)
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Mansalva&display=swap');
.titleFont{
  font-family: 'Mansalva', cursive;
  font-size: 25px;
}
</style>
