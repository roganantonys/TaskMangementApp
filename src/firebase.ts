import * as firebase from 'firebase'
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAWbYmb9cU0uhjDofTHzFyV4lpDA79FLVc",
    authDomain: "taskmanagementapp-3136f.firebaseapp.com",
    projectId: "taskmanagementapp-3136f",
    storageBucket: "taskmanagementapp-3136f.firebasestorage.app",
    messagingSenderId: "325335197287",
    appId: "1:325335197287:web:1d137453e21d8457e796c2",
    measurementId: "G-DF1T14HJJM"
  };


firebase.intialaizeApp(firebaseConfig)

  
 

export const fireDB = firebase.firestore();