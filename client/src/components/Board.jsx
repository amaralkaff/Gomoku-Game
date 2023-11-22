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

  // fetch data only if it's after the opponent's move
  const currPlayer = localStorage.getItem("user_id");
  if (currPlayer == "p1" && turn % 2 == 0) {
    fetchDataFromFB();
  } else if (currPlayer == "p2" && turn % 2 != 0) {
    fetchDataFromFB();
  }

  //
  const getPieceStyle = (piece) => {
    switch (piece) {
      case "X":
        return "bg-black text-white";
      case "O":
        return "bg-white text-black";
      default:
        return "";
    }
  };

  //
  const boardStyle =
    "grid grid-cols-[repeat(15,1fr)] grid-rows-[repeat(15,1fr)] gap-1 w-[525px] h-[525px] transform rotate-x-[45deg] rotate-z-[45deg] shadow-xl";
  const squareStyle = "border border-gray-400 rounded-full bg-wood-texture";
  const pieceStyle = (piece) =>
    ({
      X: "bg-black w-6 h-6 rounded-full mx-auto mt-1 shadow-lg",
      O: "bg-white w-6 h-6 rounded-full mx-auto mt-1 shadow-lg",
    }[piece] || "");

  return (
    <div className="perspective[1000px] perspective-origin[50% 50%] transition-transform duration-700 ease-in-out">
      <div className={boardStyle}>
        {board.map((row, x) =>
          row.map((square, y) => (
            <button
              key={`${x}-${y}`}
              onClick={() => dispatch(onSquareClick({ x, y }))}
              disabled={disabled}
              className={`${squareStyle} ${getPieceStyle(square)}`}
            >
              {square && (
                <div className={pieceStyle(square)}>
                  <span className="sr-only">{square}</span>
                </div>
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default Board;
