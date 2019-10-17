<template>
  <div id="landingPage">
    <h2>Sans-Kanban</h2>
    <h4>Welcome to Sans-Kanban! One step closer to be awesome!</h4>
    <a-button  shape="round" icon="google" size="large" id="googleBtn" @click="googleAuth()">Google Login</a-button>
    <h4>powered by:</h4>
    <img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Firebase_Logo.png" width="200px" alt="">
  </div>
</template>

<script>
import { auth , provider } from "../../config/auth"
export default {
    name : 'LandingPage',
  methods: {
    googleAuth() {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          let token = result.credential.accessToken;
          let user = result.user;
          localStorage.setItem('token', user.uid)
          localStorage.setItem('pengabdisetan', user.displayName)
          this.$router.push({path : '/'})
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
#landingPage {
  background-image: linear-gradient(to right top, #f2f2f2, #ececf0, #e6e6ee, #dee1ed, #d6dceb, #d3dded, #cfdfef, #cbe0f1, #cde8f5, #d1f0f9, #d7f8fb, #defffd);
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
h2 {
  font-family: "Permanent Marker", cursive;
  font-weight: 700;
  font-size: 72px;
  margin: 0;
}
h4 {    
  font-family: "Josefin Sans", sans-serif;
}
#googleBtn{
    margin-bottom: 10vh;
}
img{
    margin-top: -2vh;
}
</style>