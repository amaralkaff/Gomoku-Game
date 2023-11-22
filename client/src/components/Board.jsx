//components/Board.jsx
import "../index.css";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase/firebaseConfig";

// redux
import { useSelector, useDispatch } from "react-redux";
import { onSquareClick, setWaiting } from "../slices/gomokuSlice";
import { useEffect } from "react";

function Board() {
  const disabled = useSelector((state) => state.gomoku.disabled);
  const turn = useSelector((state) => state.gomoku.turn);
  const board = useSelector((state) => state.gomoku.board);
  const waiting = useSelector(state => state.gomoku.waiting);
  const dispatch = useDispatch();

  // fetch data from firebase
  function fetchDataFromFB() {
    const upMove = ref(database, "gomokuGame");
    onValue(upMove, (snapshot) => {
      const data = snapshot.val();
      if (data.turn % 2 === 0) {
        dispatch(onSquareClick(data.p1.lastMove));
      } else {
        dispatch(onSquareClick(data.p2.lastMove));
      }
    });
  }

  
  const upMove = ref(database, "gomokuGame");
  onValue(upMove, (snapshot) => {
    const data = snapshot.val();
    if (data.p2.join == true) {
      dispatch(setWaiting());
    }
  })

  // fetch data only if it's after the opponent's move
  const currPlayer = localStorage.getItem("user_id");
  if (currPlayer == "p1" && turn % 2 == 0) {
    fetchDataFromFB();
  } else if (currPlayer == "p2" && turn % 2 != 0) {
    fetchDataFromFB();
  }

  return (<>
    { waiting && (
      <h1>Waiting for player 2 to join...</h1>
    ) }

    { !waiting && (
      <div className="perspective[1000px] perspective-origin[50% 100%]">
        <div className="grid grid-cols-[repeat(15,1fr)] grid-rows-[repeat(15,1fr)] gap-0 w-[525px] h-[525px] transform rotate-x-[45deg] rotate-z-[45deg] shadow-2xl">
          {board.map((row, x) => {
            return row.map((square, y) => {
              return (
                <button
                  key={`${x}-${y}`}
                  onClick={() => dispatch(onSquareClick({ x, y }))}
                  disabled={disabled}
                  className="border border-gray-400 hover:bg-gray-200 transition duration-300 ease-in-out transform hover:scale-110"
                >
                  {square}
                </button>
              );
            });
          })}
        </div>
      </div>
    ) }
  </>);
}

export default Board;
