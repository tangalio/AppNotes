import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/storage';
const firebaseConfig = {
    apiKey: "AIzaSyDZpieQloN3IXypCG83_wxJ3W3lH6mpX0w",
    authDomain: "notes1-b39a3.firebaseapp.com",
    projectId: "notes1-b39a3",
    storageBucket: "notes1-b39a3.appspot.com",
    messagingSenderId: "534683628019",
    appId: "1:534683628019:web:a1e1536dd539646f7fa286",
    measurementId: "G-YNTWG3F8FF"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };