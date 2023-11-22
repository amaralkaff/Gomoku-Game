import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen w-screen flex flex-col justify-center items-center p-5 bg-gradient-to-bl from-green-600 via-blue-500 to-purple-700">
        <div className="text-center mb-10">
          <h1 className="text-6xl font-bold text-white mb-3 tracking-wide animate-pulse">
            Welcome to Gomoku!
          </h1>
          <h2 className="text-4xl font-semibold text-gray-200 mb-6">
            A Classic Strategy Game
          </h2>
          <p className="text-lg font-medium text-gray-300 max-w-xl mx-auto leading-relaxed">
            Choose to create a new game or join an existing one and test your
            strategic skills in this ancient board game.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <button
            className="bg-white text-gray-800 font-semibold py-3 px-6 border border-gray-400 rounded-lg shadow-xl transform hover:scale-105 transition duration-500 ease-in-out hover:shadow-2xl"
            onClick={() => {
              localStorage.setItem("user_id", "p1");
              navigate("/game");
            }}
          >
            Create Game
          </button>
          <button
            className="bg-white text-gray-800 font-semibold py-3 px-6 border border-gray-400 rounded-lg shadow-xl transform hover:scale-105 transition duration-500 ease-in-out hover:shadow-2xl"
            onClick={() => {
              localStorage.setItem("user_id", "p2");
              navigate("/game");
            }}
          >
            Join Game
          </button>
        </div>
      </div>
    </>
  );
}
