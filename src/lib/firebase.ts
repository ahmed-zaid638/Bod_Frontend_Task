import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQmtsaYYq-ffJSMGhMIWmwA3bUMyll6_A",
  authDomain: "mentorship-task-1.firebaseapp.com",
  projectId: "mentorship-task-1",
  storageBucket: "mentorship-task-1.firebasestorage.app",
  messagingSenderId: "29989254268",
  appId: "1:29989254268:web:cc255de81f8634196845f9",
  measurementId: "G-1YL7BPCSQX",
};

const app = initializeApp(firebaseConfig);

export const firebaseApp = app;
export const auth = getAuth(app);
