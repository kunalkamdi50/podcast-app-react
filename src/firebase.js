// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtyN0U0SdSOjLRkjN_65vcvFN8bNXjfR0",
  authDomain: "podcast-app-react-e3a78.firebaseapp.com",
  projectId: "podcast-app-react-e3a78",
  storageBucket: "podcast-app-react-e3a78.appspot.com",
  messagingSenderId: "109944640821",
  appId: "1:109944640821:web:f29c68cc63f70adb39287c",
  measurementId: "G-FFQL7X3H02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage };