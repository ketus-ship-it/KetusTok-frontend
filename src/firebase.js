import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "TON_API_KEY",
  authDomain: "TON_AUTH_DOMAIN",
  projectId: "TON_PROJECT_ID",
  storageBucket: "TON_STORAGE_BUCKET",
  messagingSenderId: "TON_SENDER_ID",
  appId: "TON_APP_ID",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export {
  auth,
  provider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
};
