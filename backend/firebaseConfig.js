import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCrFENIzUVWebMY8-iQ9cHZ6lOG9j8dv08",
    authDomain: "delish-dish.firebaseapp.com",
    databaseURL: "https://delish-dish.firebaseio.com",
    projectId: "delish-dish",
    storageBucket: "delish-dish.appspot.com",
    messagingSenderId: "455439935142",
    appId: "1:455439935142:web:c68d7f338814529fd0f667"
};

firebase.initializeApp(config);

firebase.firestore();

export default firebase;