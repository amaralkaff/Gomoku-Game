import { useState } from "react";
import Board from "../components/Board";
import Gomoku from "../../../game";

const game = new Gomoku();

export default function Game() {
    const [gameStatus, setGameStatus] = useState({ ...game.status });
    function onSquareClick(i, j) {
        game.move(i, j);
        console.log(game.status.winner);
        setGameStatus({ ...game.status });
    }

    return (<>
    <div className="min-h-screen w-screen flex justify-center items-center">
        <div className="grid grid-cols-[1.7fr_1fr] w-screen">
            {/* first 3/4 (main) */}
            <div className="flex justify-end items-center py-5">
                <Board gameBoard={gameStatus.board} onSquareClick={onSquareClick} />
            </div>


            {/* last 1/4 (sidebar) */}
            <div>
                { (game.status.status == "Finished") && (
                    <>
                    <div className="p-5">
                        <h2>Game over! Winner is X</h2>
                        <p>(note: this text is a placeholder)</p>
                    </div>
                    </>
                ) }
            </div>
        </div>
    </div>
    </>)
}