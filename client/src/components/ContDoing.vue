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
    <b-button href="#" variant="primary" class='detail'>Show Detail</b-button>
    </b-card>
</template>

<script>
export default {
  props: ['getDoing']
}
</script>

<style>

</style>
