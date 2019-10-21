<template>
    <v-card class="mb-6">
        <v-toolbar flat :color="color + ' ' + 'darken-3'" dark>
            <v-toolbar-title>{{detail.name}}</v-toolbar-title>
        </v-toolbar>

        <v-card-text>{{detail.description}}</v-card-text>

        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on }">
                <v-footer :color="color + ' ' + 'accent-4'" dark>
                    <v-btn block text small v-on="on">View</v-btn>
                </v-footer>
            </template>
            <EditForm
                @close="dialog = false; formKey++"
                :key="formKey"
                :color="color"
                :detail="detail"
            />
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
    props: ["color", "detail"],
    data() {
        return {
            dialog: false,
            formKey: 0
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