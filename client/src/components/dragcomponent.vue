<template>
  <div>
    <h3 class="subtitle"> {{ name }} </h3>
    <draggable class="list-group" :list="list" group="people">
        <div
        class="list-group-item"
        v-for="(element) in list"
        :key="element.name"
        >
            <p>{{ element.name }}</p>
            <div class="center">
              <detailtask :person='element' />
              <deletetask :id='element.id' />
            </div>
        </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import deletetask from './deletetask'
import detailtask from './detailtask'

export default {
  nama: 'dragcomponent',
  props: ['name', 'list'],
  components: {
    draggable,
    deletetask,
    detailtask
  }
}
</script>

<style>
.subtitle {
  color: antiquewhite;
  font-family: 'Mansalva', cursive;
  font-size: 50px;
  text-shadow: 5px 5px #166989;
}

.list-group-item {
  background-color: #91c6e5 !important;
  margin: 5px;
}

p {
  color: antiquewhite;
  font-size: 25px;
  font-weight: bold;
  text-shadow: 1px 1px #166989;
  font-family: 'Quattrocento Sans', sans-serif;
  margin: 0px;
}

.center {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
