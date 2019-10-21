<template>
    <v-container fluid class="py-0">
        <v-row>
            <v-col cols="12" md="6" lg="3" class="indigo lighten-2 no-overflow">
                <Container :planned="planned" :color="'indigo'" :category="'Planned'" :w="1" />
            </v-col>
            <v-col cols="12" md="6" lg="3" class="pink lighten-2">
                <Container :wip="wip" :color="'pink'" :category="'WIP'" :w="2" />
            </v-col>
            <v-col cols="12" md="6" lg="3" class="purple lighten-2">
                <Container
                    :testing="testing"
                    :color="'purple'"
                    :category="'Testing and Validation'"
                    :w="3"
                />
            </v-col>
            <v-col cols="12" md="6" lg="3" class="blue lighten-2">
                <Container :completed="completed" :color="'blue'" :category="'Completed'" :w="4" />
            </v-col>
        </v-row>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on }">
                <v-btn v-on="on" fab fixed bottom right dark>
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>
            <CreateForm @close="dialog = false; formKey++" :key="formKey" />
        </v-dialog>
    </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
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
            dialog: false,
            formKey: 0
        };
    },
    computed: {
        ...mapState(["planned", "wip", "testing", "completed"])
    },
    created() {
        this.$awn.asyncBlock(
            this.$store.dispatch("startListening"),
            "Connected to FIrebase",
            this.next,
            "Connecting to Firebase"
        );
    }
};
</script>

<style scoped>
</style>