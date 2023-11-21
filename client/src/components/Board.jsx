import React from "react";
import "../index.css";
import Square from "./Square";

function Board({ gameBoard, onSquareClick }) {
  return (
    <div className="border-2 grid grid-cols-[repeat(15,1fr)] grid-rows-[repeat(15,1fr)] gap-0 w-[525px] h-[525px]">
      { gameBoard.map((row, i) => {
        return row.map((square, j) => {
            return <Square key={`${i}-${j}`} player={square} onSquareClick={() => onSquareClick(i, j)} />
        })
      }) }
    </div>
  );
};

export default Board;
