import { useEffect } from "react";
import Board from "../components/Board";

// redux
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../slices/gomokuSlice";

// firebase
import { database } from "../firebase/firebaseConfig";
import { ref, update } from "firebase/database";

export default function Game() {
  // const isFinished = useSelector((state) => state.gomoku.isFinished);
  // const turn = useSelector((state) => state.gomoku.turn);
  const { turn, isFinished, board, lastMoveByX, lastMoveByO, disabled } = useSelector((state) => state.gomoku);

  const dispatch = useDispatch();

  // reset board back to the beginning before starting the game
  useEffect(() => {
    const player = localStorage.getItem("user_id");
    if (player == "p1") dispatch(reset());
  }, []);

  // check if connected
  function setStatusConnected(player) {
    const updates = {};
    updates[`gomokuGame/${player}/join`] = true;
    update(ref(database), updates);
  }

  useEffect(() => {
    const player = localStorage.getItem("user_id");
    if (player == "p1") {
      // connected as player 1
      setStatusConnected("p1");
    } else if (player == "p2") {
      // connected as player 2
      setStatusConnected("p2");
    }
  })

  return (
    <>
      <div className="min-h-screen w-screen flex flex-col justify-center items-center p-5 bg-gradient-to-bl from-gray-300 to-gray-600">
        <div className="bg-white shadow-2xl rounded-xl p-5">
          {/* first 3/4 (main) */}
          <div className="flex justify-center">
            <Board />
          </div>

          {/* last 1/4 (sidebar) */}
          <div className="flex flex-col justify-center items-center">
            {isFinished && (
              <>
                <div className="flex justify-center">
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">
                    {turn === 0 ? "Black" : "White"} wins!
                  </h2>
                  <p className="text-3xl font-bold text-gray-800 mb-3">
                    {turn === 0 ? "🏆" : "🎉"}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
