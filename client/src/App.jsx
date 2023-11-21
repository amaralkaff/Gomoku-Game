// src/App.jsx
import React from "react";
import Board from "./components/Board";

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Gomoku Game</h1>
      <Board />
    </div>
  );
}

export default App;
