<template>
  <div>
    <b-navbar toggleable="lg" type="light" class="mb-4">
        <b-navbar-brand href="#"><img src="../assets/kamban.png" alt="logo" class="logo-kanban"></b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
            <b-nav-item href="#">New Item</b-nav-item>
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.logo-kanban {
    width: 10vw;
}
</style>
