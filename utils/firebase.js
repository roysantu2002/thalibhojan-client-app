import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_API_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_API_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_API_PROJ_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_API_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_API_MSG_ID,
  appId: process.env.REACT_APP_FIREBASE_API_ID,
};

//firebase redux
const reduxFirebase = {
  userProfile: "users",
  useFirestoreForProfile: true,
  enableLogging: false,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
  firebase.firestore().settings({ timestampsInSnapshots: true });
} else {
  firebase.app();
}

const firestore = firebase.firestore();
const auth = firebase.auth();

// const base = Rebase.createClass(firestore);

// export default base;

// named export
export { firebase, auth, firestore, reduxFirebase };
