/*
// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

firebase.initializeApp({
    apiKey: "AIzaSyBwSLI9PAXLbcWo2xbV6UOMLy6Npx-Sg1U",
    authDomain: "reactchat-1757f.firebaseapp.com",
    projectId: "reactchat-1757f",
    storageBucket: "reactchat-1757f.appspot.com",
    messagingSenderId: "214293260411",
    appId: "1:214293260411:web:34d495502f3cc9e6d65ade"
})

export default firebase;*/


import firebase from "firebase/compat";

//const settings = {timestampsInSnapshots: true};
const config = {
    apiKey: "AIzaSyBwSLI9PAXLbcWo2xbV6UOMLy6Npx-Sg1U",
    authDomain: "reactchat-1757f.firebaseapp.com",
    projectId: "reactchat-1757f",
    storageBucket: "reactchat-1757f.appspot.com",
    messagingSenderId: "214293260411",
    appId: "1:214293260411:web:34d495502f3cc9e6d65ade",
    databaseURL: "https://reactchat-1757f-default-rtdb.firebaseio.com/"
};
firebase.initializeApp(config);

//firebase.firestore().settings(settings);

export default firebase.database();
