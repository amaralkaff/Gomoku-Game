//components/Board.jsx
import React from "react";
import "../index.css";
import { ref, set, onValue } from "firebase/database";
import { database } from "../firebase/firebaseConfig";

// redux
import { useSelector, useDispatch } from "react-redux";
import { onSquareClick } from "../slices/gomokuSlice";

function Board() {
  const isFinished = useSelector((state) => state.gomoku.isFinished);
  const turn = useSelector((state) => state.gomoku.turn);
  const board = useSelector((state) => state.gomoku.board);
  const lastMove = useSelector((state) => state.gomoku.lastMove);
  const dispatch = useDispatch();

  // fetch data from firebase
  const upMove = ref(database, "gomokuGame");
  onValue(upMove, (snapshot) => {
    const data = snapshot.val();
    // console.log(data.lastMove);
    // dispatch(onSquareClick(data.lastMove));
  });

  return (
    <div className="border-2 grid grid-cols-[repeat(15,1fr)] grid-rows-[repeat(15,1fr)] gap-0 w-[525px] h-[525px]">
      {board.map((row, x) => {
        return row.map((square, y) => {
          return (
            <button
              key={`${x}-${y}`}
              onClick={() => {
                dispatch(onSquareClick({ x, y }));
              }}
              className="border-2 border-gray-400 hover:bg-gray-200"
            >
              {square}
            </button>
          );
        });
      })}
    </div>
  );
}

export default Board;
