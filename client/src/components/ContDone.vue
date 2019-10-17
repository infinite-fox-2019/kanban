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
    <b-button href="#" variant="primary" class='detail'>Show Detail</b-button>
    </b-card>
</template>

<script>
export default {
  props: ['getDone']
}
</script>

<style>

</style>
