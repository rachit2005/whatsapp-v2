import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfNx87wyf1W2_LrMWRww65v0f5RZcZYD0",
  authDomain: "whatsapp-2-2a028.firebaseapp.com",
  projectId: "whatsapp-2-2a028",
  storageBucket: "whatsapp-2-2a028.appspot.com",
  messagingSenderId: "455405198173",
  appId: "1:455405198173:web:e41cbea37d2c4be55126b4",
  measurementId: "G-7K94S7LQ5J",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
