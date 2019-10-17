<template>
  <div class="container">
    <Nav />
    <List />
  </div>
</template>

<script>
import List from "@/components/List.vue";
import Nav from "@/components/Navbar.vue";

export default {
  name: "home",
  components: {
    List,
    Nav
  }
};
</script>
