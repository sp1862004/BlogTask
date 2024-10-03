// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOAO7xSyOaNFW68VF1pCPmY4UyUtR-Rms",
    authDomain: "realtime-database-d8707.firebaseapp.com",
    databaseURL: "https://realtime-database-d8707-default-rtdb.firebaseio.com",
    projectId: "realtime-database-d8707",
    storageBucket: "realtime-database-d8707.appspot.com",
    messagingSenderId: "62291185319",
    appId: "1:62291185319:web:01c345bc4b48d4687fd582"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
export default db