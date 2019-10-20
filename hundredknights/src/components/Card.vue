<template>
    <v-card>
        <v-toolbar flat :color="color + ' ' + 'darken-3'" dark>
            <v-toolbar-title>asdf</v-toolbar-title>
        </v-toolbar>

        <v-card-text>Visit ten places on our planet that are undergoing the biggest changes today.</v-card-text>

        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on }">
                <v-footer :color="color + ' ' + 'accent-4'" dark>
                    <v-btn block text small v-on="on">View</v-btn>
                </v-footer>
            </template>
            <EditForm @close="dialog = false" :color="color" />
        </v-dialog>
    </v-card>
</template>

<script>
import EditForm from "./EditForm";
export default {
    name: "card",
    components: {
        EditForm
    },
    props: ["color"],
    data() {
        return {
            dialog: false
        };
    },
    methods: {
        submit() {
            this.dialog = false;
        }
    }
};
</script>

<style>
</style>