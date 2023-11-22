import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUiORYs7vm0YoEGVel-8rrJTv05UsUQVo",
  authDomain: "pokeapp-92e12.firebaseapp.com",
  projectId: "pokeapp-92e12",
  storageBucket: "pokeapp-92e12.appspot.com",
  messagingSenderId: "998620141102",
  appId: "1:998620141102:web:1af75a0ac1e1a12667b1bf",
  measurementId: "G-01EWV0Z6QW"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const usersRef = collection(firebaseDB, "users");
export const pokemonListRef = collection(firebaseDB, "pokemonList");
