<template>
    <v-container fluid class="py-0">
        <v-row>
            <v-col cols="12" md="6" lg="3" class="indigo lighten-2 no-overflow">
                <Container :color="'indigo'" :category="'Planned'" />
            </v-col>
            <v-col cols="12" md="6" lg="3" class="pink lighten-2">
                <Container :color="'pink'" :category="'WIP'" />
            </v-col>
            <v-col cols="12" md="6" lg="3" class="purple lighten-2">
                <Container :color="'purple'" :category="'Testing and Validation'" />
            </v-col>
            <v-col cols="12" md="6" lg="3" class="blue lighten-2">
                <Container :color="'blue'" :category="'Completed'" />
            </v-col>
        </v-row>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on }">
                <v-btn v-on="on" fab fixed bottom right dark>
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>
            <CreateForm @close="dialog = false" />
        </v-dialog>
    </v-container>
</template>

<script>
import Container from "@/components/Container";
import CreateForm from "@/components/CreateForm";
export default {
    name: "home",
    components: {
        Container,
        CreateForm
    },
    data() {
        return {
            dialog: false
        };
    }
};
</script>

<style scoped>
</style>