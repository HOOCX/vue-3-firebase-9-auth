import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyBR3UYqU0gbjbMpFMX8cdChA6ijCEo89fM",
  authDomain: "vue-3-2024-3f4c6.firebaseapp.com",
  projectId: "vue-3-2024-3f4c6",
  storageBucket: "vue-3-2024-3f4c6.appspot.com",
  messagingSenderId: "969462138158",
  appId: "1:969462138158:web:ab3f6a8fde74a9e259a6bf"
};

 initializeApp(firebaseConfig);
 const auth = getAuth()
 const db = getFirestore()

 export { auth, db };


