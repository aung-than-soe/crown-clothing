import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

 const config = {
    apiKey: "AIzaSyCDzhZZoUj0npz6gZL-cGLg3ubXd-nF95o",
    authDomain: "crown-db-732dd.firebaseapp.com",
    databaseURL: "https://crown-db-732dd.firebaseio.com",
    projectId: "crown-db-732dd",
    storageBucket: "crown-db-732dd.appspot.com",
    messagingSenderId: "385055393684",
    appId: "1:385055393684:web:541aa2534dce28b932b181"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const SignInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;