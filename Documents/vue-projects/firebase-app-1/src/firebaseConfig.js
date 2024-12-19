import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBR3UYqU0gbjbMpFMX8cdChA6ijCEo89fM",
  authDomain: "vue-3-2024-3f4c6.firebaseapp.com",
  projectId: "vue-3-2024-3f4c6",
  storageBucket: "vue-3-2024-3f4c6.firebasestorage.app",
  messagingSenderId: "969462138158",
  appId: "1:969462138158:web:ab3f6a8fde74a9e259a6bf"
};

 const firebaseApp = initializeApp(firebaseConfig);
 const auth = getAuth()
 const db = getFirestore()
 const storage = getStorage(firebaseApp)

 export { auth, db, storage };


