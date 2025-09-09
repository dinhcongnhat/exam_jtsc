// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCE9pYi-F8f8aJ66GvhlgrXVnTdJBz4sNc",
    authDomain: "jtscdb.firebaseapp.com",
    projectId: "jtscdb",
    storageBucket: "jtscdb.firebasestorage.app",
    messagingSenderId: "Y676905178628",
    appId: "1:676905178628:web:5242a9e2cfedf0b7640751"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Xuất các đối tượng để các module khác có thể import
export { app, auth, db };