// import { useState } from "react";3
import Board from "../components/Board";
// import Gomoku from "../../../game";

// redux
import { useSelector } from "react-redux";

export default function Game() {
  const isFinished = useSelector((state) => state.gomoku.isFinished);
  const turn = useSelector((state) => state.gomoku.turn);
  // const board = useSelector((state) => state.gomoku.board);

  console.log(turn);

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
