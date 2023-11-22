// firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA7pNDh-lKBACr8cxUkZm3qM4zyfsG4mds",
  authDomain: "xs-os-gomoku.firebaseapp.com",
  databaseURL:
    "https://xs-os-gomoku-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "xs-os-gomoku",
  storageBucket: "xs-os-gomoku.appspot.com",
  messagingSenderId: "109035339250",
  appId: "1:109035339250:web:fbaff6c63d3c6c125bbf6b",
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export { database };
