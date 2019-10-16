<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import db from "@/api/firebase";

export default {
  name: "App",
};
</script>

<style>
html { 
  background: url(/background.jpg) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
body {
  background: transparent
}
</style>