const firebase = require("firebase");
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: process.env.VUE_APP_APIKEY,
    authDomain: process.env.VUE_APP_AUTHDOMAIN,
    projectId: process.env.VUE_APP_PROJECTID
});

const db = firebase.firestore();

export default db