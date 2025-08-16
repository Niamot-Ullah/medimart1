// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAxfEYpO9ROfXSHBn0jTaJBqGec32J24s8",
//   authDomain: "ph-assaignment-12-medimart.firebaseapp.com",
//   projectId: "ph-assaignment-12-medimart",
//   storageBucket: "ph-assaignment-12-medimart.firebasestorage.app",
//   messagingSenderId: "1070573363503",
//   appId: "1:1070573363503:web:314eda77edc1c63f1781da"
// };


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;