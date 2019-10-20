<template>
    <v-card>
        <v-form @submit.prevent="submit">
            <v-toolbar dark :color="color">
                <v-btn icon dark @click="$emit('close')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Edit</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark text>Delete</v-btn>
                </v-toolbar-items>
                <v-toolbar-items>
                    <v-btn dark text type="submit">Update</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field outlined label="Name" v-model="name"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea outlined v-model="description" label="Description"></v-textarea>
                    </v-col>
                    <v-col cols="12">
                        <v-select
                            :items="items"
                            label="Outlined style"
                            dense
                            outlined
                            v-model="status"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-card>
</template>

<script>
export default {
    props: ["color"],
    data() {
        return {
            items: ["Planned", "WIP", "Testing and Validation", "Completed"],
            status: null,
            name: "",
            description: ""
        };
    },
    methods: {
        submit() {
            this.$emit("close");
        }
    }
};
</script>

<style>
</style>