import firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/firestore";
import 'firebase/storage';

var firebaseConfig = {
  apiKey: "AIzaSyBPx3GfuiNW_erFYCSCWeIEKkCkV1nE1xU",
  authDomain: "dogs-cc9e0.firebaseapp.com",
  databaseURL: "https://dogs-cc9e0.firebaseio.com",
  projectId: "dogs-cc9e0",
  storageBucket: "dogs-cc9e0.appspot.com",
  messagingSenderId: "1056379902127",
  appId: "1:1056379902127:web:39000f9e9cc56999a61c5a"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const provider = new firebase.auth.GoogleAuthProvider();
export const storage = firebase.storage();


