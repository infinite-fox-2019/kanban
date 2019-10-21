<template>
  <b-card
    :header="getDoing.title"
    header-tag="header"
    >
    <div class='row-text'>
    <div class="col">
        <b-card-text><small>Point: {{ getDoing.point }}</small></b-card-text>
    </div>
    <div class="col">
        <b-card-text><small>Assigned To: {{ getDoing.assigned }}</small></b-card-text>
    </div>
    </div>
    <Action :take-id='getDoing.id' :take-name='getDoing.name' @sendchangeleft='takeleft' @sendchangeright='takeright'/>
    </b-card>
</template>

<script>
import Action from './actions/Action'

export default {
  props: ['getDoing'],
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
