import { FirebaseApp, initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyBoR6sxsQ3ykjyKX18R69aNT5QqX3DpQWo",

  authDomain: "whatsapp-clone-9991d.firebaseapp.com",

  projectId: "whatsapp-clone-9991d",

  storageBucket: "whatsapp-clone-9991d.appspot.com",

  messagingSenderId: "207579117113",

  appId: "1:207579117113:web:08b53f15fd89c18f977fe8",
  databaseURL: "https://whatsapp-clone-9991d-default-rtdb.firebaseio.com/"

};


// Initialize Firebase

const app:FirebaseApp = initializeApp(firebaseConfig);

export default app; 