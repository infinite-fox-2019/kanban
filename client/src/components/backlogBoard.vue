<template>
    <div id="backlog">
        <b-card
            border-variant="danger"
            header="Backlog"
            header-bg-variant="danger"
            header-text-variant="white"
            align="center"
        >
        <draggable class="list-group" :list="backloglist" group="people">
            <div v-for="(backlog, index) in backloglist" :key="index">
                <b-card-text>
                    <b-card
                    :title="backlog.title"
                    style="max-width: 20rem;"
                    class="mb-2"
                >
                    <b-card-text>
                    <p>Description: {{backlog.description}}
                    <p>Point: {{backlog.point}}</p>
                    <p>Assigned To: {{backlog.assigned}}</p>
                    </b-card-text>
                        <b-button @click="deleteTask(backlog.id)" variant="danger">Delete</b-button>
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
  name: 'backlogBoard',
  props: ['backloglist', 'deleteTask'],
  components: {
    draggable
  }
}
</script>

<style>
#backlog {
    width: 250px;
    padding: 20px;
}
</style>
