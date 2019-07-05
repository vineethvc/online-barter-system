import firebase from 'firebase/app';
import 'firebase/storage';

// Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyAGRLF0ayP_s_E8u23bNp6xTp9DiVO5-XI",
    authDomain: "barterreactapp.firebaseapp.com",
    databaseURL: "https://barterreactapp.firebaseio.com",
    projectId: "barterreactapp",
    storageBucket: "barterreactapp.appspot.com",
    messagingSenderId: "617691427007",
    appId: "1:617691427007:web:61e26ab02c8d1727"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, firebase as default
}