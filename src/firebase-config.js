import { initializeApp } from "firebase/app";
import { getFirestore , orderBy, serverTimestamp,} from "@firebase/firestore";
import { getStorage } from "firebase/storage";





const firebaseConfig = {
    apiKey: "AIzaSyAvpIqIQk95-o769_QaGd2ADVxOE7gz1hY",
    authDomain: "cv-crud.firebaseapp.com",
    projectId: "cv-crud",
    storageBucket: "cv-crud.appspot.com",
    messagingSenderId: "233970891260",
    appId: "1:233970891260:web:7398c43851f8e653939a79",
    measurementId: "G-JNK5PFBQ5W"
  };

const app = initializeApp(firebaseConfig)
// var ref = app.database().ref("data");

// ref.on("value", function(snapshot) {
//   snapshot.forEach(function(childSnapshot) {
//     var data = childSnapshot.val();
//     // Update the page with the data
//   });
// });

export const db = getFirestore(app);
export const storage = getStorage()