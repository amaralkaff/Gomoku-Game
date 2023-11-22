import { useState } from "react";
import Board from "../components/Board";
import Gomoku from "../../../game";

// redux
import { useSelector } from "react-redux";

export default function Game() {
    const isFinished = useSelector(state => state.gomoku.isFinished);
    const turn = useSelector(state => state.gomoku.turn);
    const board = useSelector(state => state.gomoku.board);

    return (<>
    <div className="min-h-screen w-screen flex justify-center items-center">
        <div className="grid grid-cols-[1.7fr_1fr] w-screen">
            {/* first 3/4 (main) */}
            <div className="flex justify-end items-center py-5">
                <Board />
            </div>


            {/* last 1/4 (sidebar) */}
            <div>
                { (isFinished) && (
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