import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBJ1uI3Y-kXyiwTmHduCeWqrZSowNtrc-s",
    authDomain: "hangman-ali.firebaseapp.com",
    projectId: "hangman-ali",
    storageBucket: "hangman-ali.appspot.com",
    messagingSenderId: "31132875059",
    appId: "1:31132875059:web:3f597f5467c88417f4e646",
    measurementId: "G-045FCZWWMN",
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectStorage = firebase.storage();
const projectAuth = firebase.auth();

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectStorage, projectAuth, timestamp };
