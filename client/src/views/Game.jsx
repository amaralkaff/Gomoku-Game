import { useEffect } from "react";
import Board from "../components/Board";
// import WebGLCanvas from "../assets/test";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

// redux
import { useSelector } from "react-redux";

// firebase
import { database } from "../firebase/firebaseConfig";
import { ref, update } from "firebase/database";

export default function Game() {
  // const isFinished = useSelector((state) => state.gomoku.isFinished);
  // const turn = useSelector((state) => state.gomoku.turn);
  const { turn, isFinished, board, lastMoveByX, lastMoveByO, disabled } =
    useSelector((state) => state.gomoku);

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
  });

  if (isFinished) {
    // console.log(turn);
    Swal.fire({
      title: "Game Over",
      text: `${turn % 2 == 0 ? "Black" : "White"} Won!`,
      icon: "info",
    });
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen z-0 bg-gradient-to-br from-gray-300 to-gray-600">
        <div className="h-screen w-screen flex flex-col justify-center items-center p-5">
          <div className="bg-white shadow-2xl rounded-xl p-5">
            {/* first 3/4 (main) */}
            <div className="flex justify-center">
              <Board />
            </div>

            {/* last 1/4 (sidebar) */}
            <div className="flex flex-col justify-center items-center">
              {isFinished && (
                <>
                  {/* <div className="flex justify-center items-center gap-5">
                    <h2 className="text-3xl font-bold text-gray-800 mb-3 mr-3">
                      {turn != 0 ? "Black" : "White"} Won!
                    </h2>
                    <p className="text-3xl font-bold text-gray-800 mb-3 mr-3">
                      {turn == 0 ? "White" : "Black"} Lost!
                    </p>
                  </div> */}

                  <Link to="/">
                    <button className="bg-white text-gray-800 font-bold py-4 mt-4 px-8 border-2 border-gray-500 rounded-lg shadow-xl transition duration-500 ease-in-out transform hover:scale-110 hover:bg-gray-100 hover:border-gray-600 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50">
                      back to home
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
