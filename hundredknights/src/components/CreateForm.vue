<template>
    <v-card>
        <v-form @submit.prevent="submit" ref="form">
            <v-toolbar dark>
                <v-btn icon dark @click="$emit('close')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Edit</v-toolbar-title>
                <v-spacer></v-spacer>

                <v-toolbar-items>
                    <v-btn dark text type="submit">Save</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field outlined label="Name" v-model="name" :rules="required"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea
                            outlined
                            v-model="description"
                            label="Description"
                            :rules="required"
                        ></v-textarea>
                    </v-col>
                    <v-col cols="12">
                        <v-select
                            :items="items"
                            label="Outlined style"
                            dense
                            outlined
                            v-model="status"
                            :rules="required"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            items: ["Planned", "WIP", "Testing and Validation", "Completed"],
            status: null,
            name: "",
            description: "",
            required: [v => !!v || "Required"]
        };
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.$awn.async(
                    this.$store.dispatch("createKanBan", {
                        name: this.name,
                        description: this.description,
                        status: this.status
                    }),
                    () => this.$emit("close"),
                    this.next,
                    "Saving..."
                );
            }
        }
    }
};
</script>

<style>
</style>