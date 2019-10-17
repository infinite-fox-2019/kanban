<template>
  <div class="d-flex justify-content-center flex-wrap">
      <b-col sm="8" md="4">
          <div id="ToDo" class="ml-1 mt-1">
          <b-card>
            <h1 style="align-text: center;">ToDo</h1>
              <b-card id="ToDoDescription" class="p-3 my-1 text-wrap" v-for="(item) in ToDoList" v-bind:key="item.id">
                  <b-card-title id="ToDoHead">
                      <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <image xlink:href='http://simpleicon.com/wp-content/uploads/pin.png' alt="symbol" height="40" width="40"/>
                      </svg>
                      <h2>{{ item.title }}</h2>
                      <br>
                      <b-card-body>Assigned To :{{ item.assigned}}</b-card-body>
                      <br>
                      <b-card-body>Details :{{ item.description }}</b-card-body>
                      <br>
                      <b-card-body>Point Task :{{ item.point }}</b-card-body>
                      <b-button variant="danger" class="btn" @click.prevent="removeItem(item.id)">Delete</b-button>
                      <b-button variant="light" class="btn btn-default" @click.prevent="onProgress(item.id)">On Progress</b-button>
                  </b-card-title>
              </b-card>
          </b-card>
      </div>
      </b-col>
      <b-col sm="8" md="4">
        <div id="OnProgress" class="ml-1 mt-1">
           <b-card>
             <h1 style="align-text: center;">OnProgress</h1>
              <b-card id="OnProgressDescription" class="p-3 my-1 text-wrap" v-for="(item) in OnProgressList" v-bind:key="item.id">
                  <b-card-title  id="OnProgressHead">
                      <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <image xlink:href='http://simpleicon.com/wp-content/uploads/pin.png' alt="symbol" height="40" width="40"/>
                      </svg>
                      <h2>{{ item.title }}</h2>
                      <br>
                      <b-card-body>Assigned To :{{ item.assigned}}</b-card-body>
                      <br>
                      <b-card-body>Details :{{ item.description }}</b-card-body>
                      <br>
                      <b-card-body>Point Task :{{ item.point }}</b-card-body>
                      <b-button variant="danger" @click.prevent="removeItem(item.id)">Delete</b-button>
                      <b-button variant="light" class="btn" @click.prevent="ToDo(item.id)">ToDo</b-button>
                      <b-button variant="light" class="btn" @click.prevent="Done(item.id)">Done</b-button>
                  </b-card-title>
              </b-card>
          </b-card>
        </div>
      </b-col>
      <b-col sm="8" md="4">
        <div id="Done" class="ml-1 mt-1">
          <b-card>
            <h1 style="align-text: center;">Done</h1>
              <b-card id="DoneDescription" class="p-3 my-1 text-wrap" v-for="(item) in DoneList" v-bind:key="item.id">
                  <b-card-title id="DoneHead">
                      <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <image xlink:href='http://simpleicon.com/wp-content/uploads/pin.png' alt="symbol" height="40" width="40"/>
                      </svg>
                      <h2>{{ item.title }}</h2>
                      <br>
                      <b-card-body>Assigned To :{{ item.assigned}}</b-card-body>
                      <br>
                      <b-card-body>Details :{{ item.description }}</b-card-body>
                      <br>
                      <b-card-body>Point Task :{{ item.point }}</b-card-body>
                      <b-button variant="danger" class="btn" @click.prevent="removeItem(item.id)">Delete</b-button>
                      <b-button variant="light" class="btn" @click.prevent="onProgress(item.id)">On Progress</b-button>
                  </b-card-title>
              </b-card>
          </b-card>
        </div>
      </b-col>

  </div>
</template>

<script>
import db from '../config/firestore'
export default {
  data: () => {
    return {
      ToDoList: [],
      OnProgressList: [],
      DoneList: []
    }
  },
  methods: {
    onProgress (id) {
      db.collection('lists').doc(id)
        .update({
          status: 'OnProgress'
        })
        .then(result => {
          console.log(result)
        })
        .catch(err => {
          console.log(err)
        })
    },
    Done (id) {
      db.collection('lists').doc(id)
        .update({
          status: 'Done'
        })
        .then(result => {
          console.log(result)
        })
        .catch(err => {
          console.log(err)
        })
    },
    ToDo (id) {
      db.collection('lists').doc(id)
        .update({
          status: 'ToDo'
        })
        .then(result => {
          console.log(result)
        })
        .catch(err => {
          console.log(err)
        })
    },
    removeItem (id) {
      db.collection('lists').doc(id)
        .delete()
        .then(result => {
          console.log(result)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    db.collection('lists').onSnapshot(querySnapshot => {
      this.ToDoList = []
      this.OnProgressList = []
      this.DoneList = []
      querySnapshot.forEach(doc => {
        let id = doc.id
        let temp = doc.data()
        if (temp.status === 'ToDo') {
          this.ToDoList.unshift({
            id,
            title: temp.title,
            description: temp.description,
            assigned: temp.assigned,
            status: temp.status,
            point: temp.point
          })
          console.log(this.ToDoList)
        } else if (temp.status === 'OnProgress') {
          this.OnProgressList.unshift({
            id,
            title: temp.title,
            description: temp.description,
            assigned: temp.assigned,
            status: temp.status,
            point: temp.point
          })
          console.log(this.OnProgressList)
        } else if (temp.status === 'Done') {
          this.DoneList.unshift({
            id,
            title: temp.title,
            description: temp.description,
            assigned: temp.assigned,
            status: temp.status,
            point: temp.point
          })
          console.log(this.DoneList)
        }
      })
    })
  }
}
</script>

<style>
.btn {
    margin: 5px;
    padding: 10px;
}
#ToDo {
  background-color: rgba(247, 20, 20, 0.89) ;
  margin: 10px;
  padding: 5px;
}
#ToDoHead {
  background-color:  rgba(236, 197, 197, 0.89) ;
  margin: 10px;
  padding: 10px;
}
#OnProgress{
  background-color: rgba(228, 224, 15, 0.89) ;
  margin: 10px;
  padding: 5px;
}
#OnProgressHead {
  background-color:  rgba(219, 223, 172, 0.89) ;
  margin: 10px;
  padding: 10px;
}
#Done{
  background-color: rgba(82, 228, 15, 0.89) ;
  margin: 10px;
  padding: 5px;
}
#DoneHead {
  background-color:  rgba(201, 223, 172, 0.89) ;
  margin: 10px;
  padding: 10px;
}
</style>
