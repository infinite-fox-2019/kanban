<template>
  <b-card
    :header="getbacklog.title"
    header-tag="header"
    >
    <div class='row-text'>
    <div class="col">
        <b-card-text><small>Point: {{ getbacklog.point }}</small></b-card-text>
    </div>
    <div class="col">
        <b-card-text><small>Assigned To: {{ getbacklog.assigned }}</small></b-card-text>
    </div>
    </div>
    <Action :take-id='getbacklog.id' :take-name='getbacklog.name' @sendchangeleft='takeleft' @sendchangeright='takeright'/>
    </b-card>
</template>

<script>
import Action from './actions/Action'

export default {
  props: ['getbacklog'],
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
