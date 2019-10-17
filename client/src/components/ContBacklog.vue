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
    <b-button href="#" variant="primary" class='detail'>Show Detail</b-button>
    </b-card>
</template>

<script>
export default {
  props: ['getbacklog']
}
</script>

<style>

</style>
