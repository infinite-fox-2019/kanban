<template>
    <v-container class="lighten-2">
        <v-row>
            <v-col cols="12">
                <v-btn outlined block dark>{{category}}</v-btn>
            </v-col>
            <v-col cols="12">
                <Card :color="color" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Card from "./Card";
export default {
    name: "container",
    props: ["color", "category"],
    components: {
        Card
    }
};
</script>

<style>
</style>