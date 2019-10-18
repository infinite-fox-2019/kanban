<template>
    <div id="done">
        <b-card
            border-variant="success"
            header="Done"
            header-bg-variant="success"
            header-text-variant="white"
            align="center"
        >
        <draggable class="list-group" :list="donelist" group="people">
            <div v-for="(done, index) in donelist" :key="index">
                <b-card-text>
                    <b-card
                    :title="done.title"
                    style="max-width: 20rem;"
                    class="mb-2"
                >
                    <b-card-text>
                    <p>Description: {{done.description}}
                    <p>Point: {{done.point}}</p>
                    <p>Assigned To: {{done.assigned}}</p>
                    </b-card-text>
                        <b-button @click='deleteTask(done.id)' variant="danger">Delete</b-button>
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
  name: 'doneBoard',
  props: ['donelist', 'deleteTask'],
  components: {
    draggable
  }
}
</script>

<style>
#done {
    width: 250px;
    padding: 20px;
}
</style>
