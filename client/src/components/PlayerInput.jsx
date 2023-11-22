// components/PlayerInput.jsx
import { useState } from "react";
import sweetalert2 from "sweetalert2";

export default function PlayerInput({ onStartGame }) {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const startGame = () => {
    if (!player1 || !player2) {
      sweetalert2.fire({
        title: "Error",
        text: "Please enter player names",
        icon: "error",
      });
    } else {
      onStartGame(player1, player2);
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col justify-center items-center p-5 bg-gradient-to-bl from-gray-300 to-gray-600">
      <div className="bg-white shadow-2xl rounded-xl p-5 transform hover:scale-105 transition duration-700 ease-in-out">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Enter Player Names
        </h1>
        <div className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Player 1"
            className="border border-gray-300 p-2 rounded-lg"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
          />
          <input
            type="text"
            placeholder="Player 2"
            className="border border-gray-300 p-2 rounded-lg"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
          />
          <button
            className="bg-gray-800 hover:bg-gray-900 text-white py-3 px-6 rounded-lg shadow-lg transform hover:scale-110 transition duration-500"
            onClick={startGame}
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}
