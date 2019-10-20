<template>
  <b-card
    :header="getodo.title"
    header-tag="header"
    >
    <div class='row-text'>
    <div class="col">
        <b-card-text><small>Point: {{ getodo.point }}</small></b-card-text>
    </div>
    <div class="col">
        <b-card-text><small>Assigned To:: {{ getodo.assigned }}</small></b-card-text>
    </div>
    </div>
    <Action :take-id='getodo.id' :take-name='getodo.name' @sendchangeleft='takeleft' @sendchangeright='takeright'/>
    </b-card>
</template>

<script>
import Action from './actions/Action'

export default {
  props: ['getodo'],
  components: {
    Action
  },
  methods: {
    takeleft (name) {
      this.$emit('sendchangeleftoparent', name)
    },
    takeright (name) {
      this.$emit('sendchangerightoparent', name)
    }
  }
}
</script>

<style>

</style>
