<template>
  <div>
    <b-card-group deck>
      <b-card
        :header="title"
        header-text-variant="white"
        header-bg-variant="primary"
      >
        <draggable class="list-group" :list="list" group="people" @change="log">
          <div v-for="task in list" :key="task.title">
            <Card :task="task" />
          </div>
        </draggable>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Card from '@/components/Card'

export default {
  name: 'Cardstatus',
  components: {
    draggable,
    Card
  },
  props: [
    'title',
    'list'
  ],
  methods: {
    add: function () {
      this.list.push({ name: 'Juan' })
    },
    replace: function () {
      this.list = [{ name: 'Edgard' }]
    },
    clone: function (el) {
      return {
        name: el.name + ' cloned'
      }
    },
    log: function (evt) {
      window.console.log(evt)
    }
  }
}
</script>

<style>

</style>
