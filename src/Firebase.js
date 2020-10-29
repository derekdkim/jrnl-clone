import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCLlPBo-XsxctjvR0bgu2qOZIyRXmmnJZo",
  authDomain: "jrnl-clone.firebaseapp.com",
  databaseURL: "https://jrnl-clone.firebaseio.com",
  projectId: "jrnl-clone",
  storageBucket: "jrnl-clone.appspot.com",
  messagingSenderId: "308297704200",
  appId: "1:308297704200:web:43254f11a6b3cbbcb1c2bd",
  measurementId: "G-8W1QZZEVB6"
};

firebase.initializeApp(firebaseConfig);

export default firebase;