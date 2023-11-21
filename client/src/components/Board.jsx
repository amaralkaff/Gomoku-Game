import React from "react";
import "../index.css";
import Square from "./Square";

function Board({ game, onSquareClick }) {
  console.log(game)
  return (
    <div className="border-2 grid grid-cols-[repeat(15,1fr)] grid-rows-[repeat(15,1fr)] gap-0 w-[500px] h-[500px]">
      { game.board.map((row, i) => {
        return row.map((square, j) => {
          // if (square) {
            return <Square key={`${i}-${j}`} player={square} onSquareClick={() => onSquareClick(i, j)} />
          // } else {
            // return <Square key={`${i}-${j}`} player="" onSquareClick={() => onSquareClick(i, j)} />
          // }
        })
      }) }
    </div>
  );
};

export default Board;
