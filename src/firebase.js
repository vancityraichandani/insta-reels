import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';





const firebaseConfig = {
    apiKey: "AIzaSyDmMWbEwxC-PbiHRHAdRz9vKlk0sN01l6Q",
    authDomain: "reels-72b17.firebaseapp.com",
    projectId: "reels-72b17",
    storageBucket: "reels-72b17.appspot.com",
    messagingSenderId: "44873846437",
    appId: "1:44873846437:web:a88533ee7e34ec201c074c",
    measurementId: "G-9W58FHZ123"
  };


  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  const firestore = firebase.firestore();

  export const database = {
      users : firestore.collection('users'),
      posts : firestore.collection('posts'),
      comments : firestore.collection('comments'),
      getTimeStamp : firebase.firestore.FieldValue.serverTimestamp
  }

  export const storage = firebase.storage()