<template>
  <div class='container'>
  <b-navbar toggleable="lg" type="dark">
    <b-navbar-brand href="#" style='color: black'>DC KamVan</b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <div>
          <div>
            <b-button
              :class="showCollapse ? 'collapsed' : null"
              :aria-expanded="showCollapse ? 'true' : 'false'"
              aria-controls="collapse-4"
              @click="toggleClick"
            >
              Toggle Collapse
            </b-button>
            <b-collapse id="collapse-4" v-model="showCollapse" class="mt-2">
              <Modal @changeStatus='goChange' @sendtobacklog='incomeBacklog'/>
            </b-collapse>
          </div>
        </div>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import Modal from './Modal'
export default {
  data () {
    return {
      showCollapse: false
    }
  },
  components: {
    Modal
  },
  methods: {
    toggleClick () {
      this.showCollapse = !this.showCollapse
    },
    goChange (status) {
      this.showCollapse = status
    },
    incomeBacklog (data) {
      this.$emit('sendtoparent', data)
    }
  }
}
</script>

<style>
</style>
