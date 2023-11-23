import { useNavigate } from "react-router-dom";
import { reset } from "../slices/gomokuSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();

  // reset board back to the beginning before starting the game
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reset());
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen z-99999 bg-gradient-to-br from-gray-300 to-gray-600">
        <div className="h-screen w-screen flex flex-col justify-center items-center p-5">
          <div className="text-center mb-10">
            <h1 className="text-6xl font-bold mb-3 tracking-wide">
              <span className="animate-colorChange">Welcome</span>{" "}
              <span className="animate-colorChange2">to</span>{" "}
              <span className="animate-colorChange3">Gomoku</span>
            </h1>
            <h2 className="text-4xl font-semibold text-gray-200 mb-6 animate-coolPulse neon-text">
              A Classic Strategy Game
            </h2>
            <div className="flex justify-center gap-5">
              <p className="text-outline font-large text-black max-w-xl mx-auto leading-relaxed tracking-wide mb-10">
                <span className="font-bold">Gomoku</span> is a strategy board
                game for two players, played on a 15x15 grid. The players take
                turns placing pieces on the board from their hand. The player
                who first aligns five of their pieces in a row, column, or
                diagonal wins the game. The game is known in several countries
                under different names.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            <button
              className="bg-white text-gray-800 font-bold py-4 px-8 border-2 border-gray-500 rounded-lg shadow-xl transition duration-500 ease-in-out transform hover:scale-110 hover:bg-gray-100 hover:border-gray-600 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
              onClick={() => {
                localStorage.setItem("user_id", "p1");
                navigate("/game");
              }}
            >
              Create Game
            </button>
            <button
              className="bg-white text-gray-800 font-bold py-4   px-8 border-2 border-gray-500 rounded-lg shadow-xl transition duration-500 ease-in-out transform hover:scale-110 hover:bg-gray-100 hover:border-gray-600 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
              onClick={() => {
                localStorage.setItem("user_id", "p2");
                navigate("/game");
              }}
            >
              Join Game
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
