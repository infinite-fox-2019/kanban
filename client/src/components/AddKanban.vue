<template>
  <v-app-bar app dense fixed height="62px" color="#f24d7e" dark>
    <v-toolbar-title id="title-navbar" class="ml-2">
      <h3>Kanban</h3>
    </v-toolbar-title>
    <div id="corner-triangle">
      <div class="text" name="triangle">
        <h1>Add New Task</h1>
      </div>
      <div class="corner-triangle-text" name="plus">
        <v-card-text style="padding:28px; position: relative">
          <v-btn absolute dark fab top right color="pink" @click.stop="dialog = true">
            <v-icon>fa-plus</v-icon>
          </v-btn>
        </v-card-text>
      </div>
    </div>
    <v-dialog v-model="dialog" width="500px" height="500px">
      <v-card height="100%" width="100%" style="padding:9%">
        <v-row justify="center" height="100%">
          <v-card-title>
            <h2 class="headline">Add New Task</h2>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form>
                <v-col>
                  <v-text-field label="Title" color="purple darken-2" v-model="title"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field label="Description" color="purple darken-2" v-model="description"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field label="Assign to" color="purple darken-2" v-model="assignTo"></v-text-field>
                </v-col>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="purple" dark @click="dialog = false">Cancel</v-btn>
            <v-btn color="pink" dark @click="createKanban">Add Task</v-btn>
          </v-card-actions>
        </v-row>
        <br />
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      title: '',
      description: '',
      assignTo: '',
      dialog: false
    }
  },
  methods: {
    createKanban () {
      if (this.title && this.description && this.assignTo) {
        let newKanban = {
          title: this.title,
          description: this.description,
          assignTo: this.assignTo,
          status: 'back-log',
          createdAt: new Date()
        }
        this.$emit('addKanban', newKanban)
        this.dialog = false
      } else {
        Swal.fire({
          html: "<p>Don't Accept Empty Input</p>",
          confirmButtonColor: '#9C28B0',
          animation: false,
          customClass: {
            popup: 'animated heartBeat'
          }
        })
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Ubuntu&display=swap');
* {
  margin: 0;
  padding: 0;
}

div#corner-triangle {
  display: block;
  width: 330px;
  height: 240px;
  border-style: solid;
  border-width: 0 330px 240px 0; /* adjust for size of triangle */
  border-color: transparent #b4b2d3 transparent transparent; /* adjust for color of triangle */
  position: fixed;
  top: 0;
  right: 0;
  z-index: 99;
  color: white;
  text-shadow: 0 0 25px 9px #fff;
  -webkit-filter: drop-shadow(0 1px 9px #000000);
  filter: drop-shadow(0 1px 9px #000000);
}
div#corner-triangle .corner-triangle-text {
  position: relative;
  font-size: 2.1em;
  top: 0;
  right: -90px;
  font-family: sans-serif, "Helvetica Neue", Helvetica, Arial;
  font-weight: 200;
  line-height: 1.1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

div#corner-triangle .corner-triangle-text a {
  color: white;
}

.text {
  width: 250px;
  font-size: 17pt;
}
h1 {
  margin-top: 20px;
}
div[name="triangle"] {
  margin-top: 18px;
  margin-left: 125px;
}
div[name="plus"] {
  margin-top: 34px;
  margin-left: 130px;
}
nav {
  position: sticky;
  z-index: 9999;
}
img {
  object-fit: fill;
}
.headline {
  margin-top: 0px;
  color: rgb(185, 50, 129);
}

.swal2-content {
  font-family: 'Ubuntu', sans-serif !important
}
</style>
