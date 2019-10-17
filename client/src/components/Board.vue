<template>
  <div class="container" :class="title">
      <h1 class="title" :class="title">{{ title }}</h1>
      <a-divider />
    <Card v-for="(el,i) in task" :key="i" :title="el.title" :desc="el.desc" :id="el.id" :date="el.deadline" :status="title"></Card> 
  </div>
</template>

<script>
import Card from './Cards'
import db from '../../config/firestore'

export default {
    name : 'Board',
    props : ['title'],
    data(){
        return {
            task : []
        }
    },
    components: {
        Card
    },
    created(){
        if(localStorage.getItem('token')){
            console.log('fetching')
            db.collection('task').where('status', '==', this.title).where('UserToken' , "==" ,localStorage.getItem('token'))
                .onSnapshot((querySnapshot) => {
                    let tasks = []
                    querySnapshot.forEach(query => {
                        let obj = {
                            ...query.data(),
                            id: query.id
                        }
                        tasks.push(obj)
                    });
                    this.task = tasks
                })
        } else {
            this.$router.push({path : '/login'})
        }
    }
}
</script>

<style scoped>
.container{
    padding: 2vh;
    margin: 2vh;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    height: 80vh;
    overflow: scroll;
    overflow-x: hidden;
}
.title{
    font-family: 'Josefin Sans', sans-serif;
    font-weight: 700;
}

.unstarted{
    color: #006D68;
}
.progress{
    color : #F05D5E;
}
.finished{
    color: #272932;
}
.unstarted::-webkit-scrollbar {
    width: 3px;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */
.unstarted::-webkit-scrollbar-thumb {
    background: #006D68;
}
.progress::-webkit-scrollbar {
    width: 3px;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */
.progress::-webkit-scrollbar-thumb {
    background: #F05D5E;
}
.finished::-webkit-scrollbar {
    width: 3px;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */
.finished::-webkit-scrollbar-thumb {
    background: #272932;
}
</style>