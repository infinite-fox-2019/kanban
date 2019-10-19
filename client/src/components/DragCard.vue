<template>
    <div class="col-lg-3 col-sm-6 mb-5">
      <b-card
          :header="name"
          header-text-variant="white"
          header-tag="header"
          style="max-width: 20rem; font-weight:bold;"
          class="header-card">
          <draggable :list="list" group="people">
              <div id='frame' v-for="(element) in list" :key="element.id">
                <a class="note sticky2">
                    <div class='pin'></div>
                    <p style="margin:0 !important">{{ element.name }}</p>
                    <hr>
                    <p style="margin:0 !important">Assigned To : 📝{{ element.assignedto }}</p>
                    <hr>
                    <p style="font-style: italic;">{{ element.desc }}</p>
                    <b-button @click.prevent="remove(element.id)" variant="outline-danger mx-auto mb-2">X delete</b-button>
                  </a>
              </div>
          </draggable>
      </b-card>
    </div>
  </template>
<script>
import draggable from 'vuedraggable'
import Swal from "sweetalert2"
import db from '../../config/firestore'
export default {
  name: 'DragCard',
  props: ['name', 'list'],
  components: {
    draggable
  },
  methods: {
    remove(id) {
      Swal.fire({
        title: 'Really want to delete me ?',
        text: 'i Will be sad',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Delete me'
      })
      .then(result => {
        console.log(result.value,'ini result');
        
        if (result.value) {
          db.collection('task')
            .doc(id)
            .delete()
            .then(result =>{
              Swal.fire('Deleted!','Your task has been deleted','success')
            })
            .catch(err => {
              Swal.fire('error','internal server error','error')
            })
        }
      })
    }
  }
}
</script>

<style scoped>

.card-header {
    background-color: #00b49d;
}
.content {
    background-color: white !important;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 4px 4px gray;
}
.card {
    background-color: rgba(129, 236, 236,.5);
}

div#frame {
    padding-bottom: 35px;
}

div#frame a.note {
    -transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -webkit-transition: all 0.2s ease-in-out;
    cursor: pointer;
    display: block;
}

div#frame a:hover.note {
    border: 1px solid rgba(0,0,0,.75);
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    transform: scale(1.1);
}

.note {
    width: 100%;
    height: auto;
    box-shadow: 0 3px 6px rgba(0,0,0,.25);
    -webkit-box-shadow: 0 3px 6px rgba(0,0,0,.25);
    -moz-box-shadow: 0 3px 6px rgba(0,0,0,.25);
    border: 1px solid rgba(0,0,0,.25);
}

.sticky2 {
    transform: rotate(1deg);
    -webkit-transform: rotate(1deg);
    -moz-transform: rotate(1deg);
    background-color: #FFF780;
}

.pin {
    border-radius: 50%;
    width: 20px;
    height: 20px;
    -webkit-box-shadow: 0 3px 6px rgba(0,0,0,.55);
    -moz-box-shadow: 0 3px 6px rgba(0,0,0,.55);
    box-shadow: 0 3px 6px rgba(0,0,0,.55);
    margin: 2px auto 0;
}

div#frame a:nth-child(1n) .pin {
    background-image: -moz-radial-gradient(35px 35px 35deg, circle cover, #00b49d 50%, black 100%);
    background-image: -webkit-radial-gradient(35px 35px, circle cover, #00b49d, black);
    background-image: radial-gradient(#00b49d 50%, black 100%);
}
</style>
