<template>
    <v-container class="lighten-2">
        <v-row>
            <v-col cols="12">
                <v-btn outlined block dark>{{category}}</v-btn>
            </v-col>
            <v-col cols="12">
                <Card v-for="(plan) in planned" :detail="plan" :key="plan.id" :color="color" />
                <Card v-for="(work) in wip" :detail="work" :key="work.id" :color="color" />
                <Card v-for="(test) in testing" :detail="test" :key="test.id" :color="color" />
                <Card
                    v-for="(complete) in completed"
                    :detail="complete"
                    :key="complete.id"
                    :color="color"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Card from "./Card";
export default {
    name: "container",
    props: ["color", "category", "planned", "wip", "testing", "completed"],
    components: {
        Card
    }
};
</script>

<style>
</style>