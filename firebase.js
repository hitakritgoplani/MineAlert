const firebaseConfig = {
  apiKey: "AIzaSyAhjWRlsnyoOJF2w4vnXLu3R_2l2-b76NU",
  authDomain: "minealert-fb30d.firebaseapp.com",
  databaseURL: "https://minealert-fb30d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "minealert-fb30d",
  storageBucket: "minealert-fb30d.appspot.com",
  messagingSenderId: "910426738411",
  appId: "1:910426738411:web:87079d07d6a11351b4b8ae",
  measurementId: "G-VRGSQ96VBV",
};

firebase.initializeApp(firebaseConfig);

<<<<<<< HEAD
var db = firebase.firestore();
=======
var db = firebase.firestore();
var rtdb = firebase.database();
>>>>>>> cb07d3eb164c4a0d18cd11faa3849d404c49f567
