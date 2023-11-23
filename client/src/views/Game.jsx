import { useEffect } from "react";
import Board from "../components/Board";
// import WebGLCanvas from "../assets/test";

// redux
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../slices/gomokuSlice";

export default function Game() {
  const isFinished = useSelector((state) => state.gomoku.isFinished);
  const turn = useSelector((state) => state.gomoku.turn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
  }, []);

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
                  <div className="flex justify-center items-center gap-5">
                    <h2 className="text-3xl font-bold text-gray-800 mb-3 mr-3">
                      {turn == 0 ? "Black" : "White"} Won!
                    </h2>
                    <p className="text-3xl font-bold text-gray-800 mb-3 mr-3">
                      {turn == 0 ? "White" : "Black"} Lost!
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
