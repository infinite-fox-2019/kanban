<template>
  <b-card
    :header="getDone.title"
    header-tag="header"
    >
    <div class='row-text'>
    <div class="col">
        <b-card-text><small>Point: {{ getDone.point }}</small></b-card-text>
    </div>
    <div class="col">
        <b-card-text><small>Assigned To:: {{ getDone.assigned }}</small></b-card-text>
    </div>
    </div>
    <Action :take-id='getDone.id' :take-name='getDone.name' @sendchangeleft='takeleft' @sendchangeright='takeright'/>
    </b-card>
</template>

<script>
import Action from './actions/Action'

export default {
  props: ['getDone'],
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

<style lang='scss'>

</style>
