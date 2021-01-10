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

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get();
    
    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.error('Error creating user', error.message)
        }
    }

    return userRef;
  }

  export const addCollectionAndDocuments = async (key, objectsToAdd) => {
      const collectionRef = firestore.collection(key);
      const batch = firestore.batch();

      objectsToAdd.forEach(obj => {
          const newDocRef = collectionRef.doc();
          batch.set(newDocRef, obj);
      });

      return await batch.commit();
  };

 export const convertCollectionSnapShotToMap = ({docs}) => {
      return docs.map(doc => {
          const { title, items } = doc.data();
          return {
              routeName: encodeURI(title.toLowerCase()),
              id: doc.id,
              title,
              items
          }
      }).reduce((accumulator, collection) => {
          accumulator[collection.routeName] = collection;
          return accumulator;
      }, {});
  }

  export const getCurrentUser = () => {
      return new Promise((resolved, reject) => {
          const unsubscribe = auth.onAuthStateChanged(user => {
              unsubscribe();
              resolved(user);
          }, reject)
      })
  }

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({prompt: 'select_account'});
  export const SignInWithGoogle = () => auth.signInWithPopup(googleProvider);

  export default firebase;