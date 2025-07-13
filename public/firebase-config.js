// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNqxGOGhF1xqb1tUY3WAD9oUI_5I9BKFU",
  authDomain: "lost-n-found-buddy.firebaseapp.com",
  projectId: "lost-n-found-buddy",
  storageBucket: "lost-n-found-buddy.firebasestorage.app",
  messagingSenderId: "519458530416",
  appId: "1:519458530416:web:cc231041a7e9dd747840b5",
  measurementId: "G-9P847LFZ0Y"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
