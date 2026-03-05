import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDWNW56LMIoWwse9FbbMJB2zT7_B6D8Jho",
  authDomain: "jassonthedesigner-8ae06.firebaseapp.com",
  projectId: "jassonthedesigner-8ae06",
  storageBucket: "jassonthedesigner-8ae06.firebasestorage.app",
  messagingSenderId: "988276733087",
  appId: "1:988276733087:web:047f0559305f69c1769eaa"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
