<template>
  <div class="login">
    <div class="border shadow">
      <a-card title="Kanban" :bordered="false" id='title'>
        <h3 style="margin-bottom: 20px;">Organize your project tasks</h3>
      <a-button type="primary" icon="google" @click="google">Sign in with google</a-button>
      </a-card>
    </div>
  </div>
</template>

<script>
// import {provider,auth} from '../../config/googleSignin'
// import firebase from '../../config/firebase'
// const firebase = require('firebase')
const {provider,auth} = require('../../config/googleSignin')

// console.log(provider);
// console.log(auth);

export default {
  name: 'login',
  methods: {
      google(){
        auth.signInWithPopup(provider).then((result)=>{
          var token = result.credential.accessToken;
          var user = result.user;
          localStorage.setItem('uid',user.uid)
          this.$router.push(`home`)
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      }
  }
}
</script>


<style scoped>
.border.shadow{
  border: 0.4px solid black;
  box-shadow: 2px 5px 5px 0px rgba(0, 0, 0, 0.322);
   position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

</style>