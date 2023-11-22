//components/Board.jsx
import "../index.css";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase/firebaseConfig";

// redux
import { useSelector, useDispatch } from "react-redux";
import { onSquareClick } from "../slices/gomokuSlice";

function Board() {
  const disabled = useSelector((state) => state.gomoku.disabled);
  const turn = useSelector((state) => state.gomoku.turn);
  const board = useSelector((state) => state.gomoku.board);
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

  const currPlayer = localStorage.getItem("user_id");
  if (currPlayer == "p1" && turn % 2 == 0) {
    fetchDataFromFB();
  } else if (currPlayer == "p2" && turn % 2 != 0) {
    fetchDataFromFB();
  }

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
              disabled={disabled}
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
