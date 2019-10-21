<template>
    <v-card>
        <v-form @submit.prevent="submit" ref="form">
            <v-toolbar dark :color="color">
                <v-btn icon dark @click="$emit('close')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Edit</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark text @click="confirmDelete">Delete</v-btn>
                </v-toolbar-items>
                <v-toolbar-items>
                    <v-btn dark text type="submit">Update</v-btn>
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
import Swal from "sweetalert2";
export default {
    props: ["color", "detail"],
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
                this.$awn.asyncBlock(
                    this.$store.dispatch("updateKanBan", {
                        id: this.detail.id,
                        name: this.name,
                        description: this.description,
                        status: this.status
                    }),
                    () => {
                        this.$awn.success("Update");
                        this.$emit("close");
                    },
                    this.next,
                    "Updating"
                );
            }
        },
        confirmDelete() {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(result => {
                if (result.value) {
                    Swal.close();
                    this.$awn.async(
                        this.$store.dispatch("deleteKanBan", this.detail.id),
                        () => this.$emit("close"),
                        this.next,
                        "Deleting..."
                    );
                }
            });
        }
    },
    created() {
        this.status = this.detail.status;
        this.name = this.detail.name;
        this.description = this.detail.description;
    }
};
</script>

<style>
</style>