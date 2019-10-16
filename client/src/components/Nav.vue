<template>
  <div>
  <b-navbar toggleable="lg" type="dark">
    <b-navbar-brand href="#" style='color: black'>DC KamVan</b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <div>
            <b-button v-b-modal.modal-1 class='btn-success'>New Task</b-button>
            <Modal />
        </div>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import Modal from './Modal'
export default {
  components: {
    Modal
  }
}
</script>

<style>

</style>
