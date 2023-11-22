// firebase/firebaseGame.js
import { database } from "./firebaseConfig";
import { ref, set, onValue } from "firebase/database";

export const updateGameState = (gameState) => {
  set(ref(database, "gomokuGame"), gameState).catch((error) => {
    console.error("Firebase set failed: ", error);
  });
};

export const onGameStateChange = (callback) => {
  const gameRef = ref(database, "gomokuGame");
  onValue(gameRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};
