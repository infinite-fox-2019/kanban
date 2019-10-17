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
    <b-button href="#" variant="primary" class='detail'>Show Detail</b-button>
    </b-card>
</template>

<script>
export default {
  props: ['getodo']
}
</script>

<style>

</style>
