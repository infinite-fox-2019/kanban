<template>
    <div>
        <button class="btn btn-primary" id="show-btn" @click="showModal">Detail</button>
        <b-modal ref="my-modal" hide-footer :title="person.name">
            <form>
                <div class="d-block text-center">
                    <h4>Description:   {{ person.desc }}</h4>
                    <h4>Assigned To:   {{ person.assignto }}</h4>
                    <h4>Point:   {{ person.point }}</h4>
                </div>
                <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close</b-button>
            </form>
        </b-modal>
    </div>
</template>

<script>
export default {
  name: 'detailtask',
  props: ['person'],
  methods: {
    showModal () {
      this.$refs['my-modal'].show()
    },
    hideModal () {
      this.$refs['my-modal'].hide()
    }
  }
}
</script>

<style>

</style>
