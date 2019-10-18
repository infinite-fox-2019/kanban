<template>
    <div id="todo">
        <b-card
            border-variant="warning"
            header="Todo"
            header-bg-variant="warning"
            header-text-variant="white"
            align="center"
        >
        <draggable class="list-group" :list="todolist" group="people">
            <div v-for="(todo, index) in todolist" :key="index">
                <b-card-text>
                    <b-card
                    :title="todo.title"
                    style="max-width: 20rem;"
                    class="mb-2"
                >
                    <b-card-text>
                    <p>Description: {{todo.description}}
                    <p>Point: {{todo.point}}</p>
                    <p>Assigned To: {{todo.assigned}}</p>
                    </b-card-text>
                        <b-button @click='deleteTask(todo.id)' variant="danger">Delete</b-button>
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
  name: 'todoBoard',
  props: ['todolist', 'deleteTask'],
  components: {
    draggable
  }

}
</script>

<style>
#todo {
    width: 250px;
    padding: 20px;
}
</style>
