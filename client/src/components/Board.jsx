import React from "react";
import "../index.css";
import Square from "./Square";

// redux
import { useSelector, useDispatch } from "react-redux";
import { onSquareClick } from "../slices/gomokuSlice";

function Board() {
  const isFinished = useSelector(state => state.gomoku.isFinished);
  const turn = useSelector(state => state.gomoku.turn);
  const board = useSelector(state => state.gomoku.board);
  const dispatch = useDispatch();

  return (
    <div className="border-2 grid grid-cols-[repeat(15,1fr)] grid-rows-[repeat(15,1fr)] gap-0 w-[525px] h-[525px]">
      { board.map((row, x) => {
        return row.map((square, y) => {
            return <button 
              key={`${x}-${y}`} 
              onClick={() => { dispatch(onSquareClick({ x, y })) }}
              className="border-2 flex justify-center items-center"
              >
                {square}
              </button>
        })
      }) }
    </div>
  );
};

export default Board;
