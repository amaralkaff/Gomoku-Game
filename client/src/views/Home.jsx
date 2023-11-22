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
        <div className="min-h-screen w-screen flex flex-col justify-center items-center p-5 bg-gradient-to-bl from-blue-400 to-indigo-600">
            <h1 className="text-5xl font-bold text-white mb-3">
            Welcome to Gomoku!
            </h1>
            <h2 className="text-3xl font-bold text-white mb-3">
                Please select an option below:
            </h2>
            <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => {
                localStorage.setItem("user_id", "p1");
                navigate("/game");
            }}
            >
                Create Game
            </button>
            <br />
            <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => {
                localStorage.setItem("user_id", "p2");
                navigate("/game");
            }}
            >
            {" "}
                Join Game
            </button>
        </div>
        </>
    );
}
