<template>
    <div id="doing">
        <b-card
            border-variant="primary"
            header="Doing"
            header-bg-variant="primary"
            header-text-variant="white"
            align="center"
        >
        <draggable class="list-group" :list="doinglist" group="people">
            <div v-for="(doing, index) in doinglist" :key="index">
                <b-card-text>
                    <b-card
                    :title="doing.title"
                    style="max-width: 20rem;"
                    class="mb-2"
                >
                    <b-card-text>
                    <p>Description: {{doing.description}}
                    <p>Point: {{doing.point}}</p>
                    <p>Assigned To: {{doing.assigned}}</p>
                    </b-card-text>
                        <b-button @click='deleteTask(doing.id)' variant="danger">Delete</b-button>
                    </b-card>
                </b-card-text>
            </div>
        </draggable>
        </b-card>
    </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'doingBoard',
  props: ['doinglist', 'deleteTask'],
  components: {
    draggable
  }
}
</script>

<style>
#doing {
    width: 250px;
    padding: 20px;
}
</style>
