import { useState } from "react";
import Board from "../components/Board";
import Gomoku from "../../../game";

const game = new Gomoku();

export default function Game() {
    const [gameStatus, setGameStatus] = useState({ ...game.status });
    function onSquareClick(i, j) {
        game.move(i, j);
        console.log(game.status);
        setGameStatus({ ...game.status });
    }

    return (<>
    <div className="flex justify-center items-center w-screen">
        <Board game={gameStatus} onSquareClick={onSquareClick} />
    </div>
    </>)
}