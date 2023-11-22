import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isFinished: false,
    turn: 1,
    board: (() => {
        let board = [];
        for (let i = 0; i < 15; i++) {
            board.push([]);
            for (let j = 0; j < 15; j++) {
                board[i].push(null);
            }
        }
        return board;
    })(),
};

export const gomokuSlice = createSlice({
    name: "gomoku",
    initialState,
    reducers: {
        onSquareClick: (state, action) => {
            const SIZE = 15;

            function checkWin(x, y) {
                // check draw
                if (state.turn == SIZE * SIZE + 1) {
                    state.isFinished = true;
                }

                // vertical
                for (let i = 0; i < SIZE - 4; i++) {
                    if (
                        state.board[i][y] &&
                        state.board[i + 1][y] === state.board[i][y] &&
                        state.board[i + 2][y] === state.board[i][y] &&
                        state.board[i + 3][y] === state.board[i][y] &&
                        state.board[i + 4][y] === state.board[i][y]
                    ) {
                        state.isFinished = true;
                    }
                }
                // horizontal
                for (let i = 0; i < SIZE - 4; i++) {
                    if (
                        state.board[x][i] &&
                        state.board[x][i + 1] === state.board[x][i] &&
                        state.board[x][i + 2] === state.board[x][i] &&
                        state.board[x][i + 3] === state.board[x][i] &&
                        state.board[x][i + 4] === state.board[x][i]
                    ) {
                        state.isFinished = true;
                    }
                }
                // diagonal
                // left-to-right diagonal (\)
                for (let i = 0; i < SIZE - 4; i++) {
                    for (let j = 0; j < SIZE - 4; j++) {
                        if (
                            state.board[i][j] &&
                            state.board[i + 1][j + 1] === state.board[i][j] &&
                            state.board[i + 2][j + 2] === state.board[i][j] &&
                            state.board[i + 3][j + 3] === state.board[i][j] &&
                            state.board[i + 4][j + 4] === state.board[i][j]
                        ) {
                            state.isFinished = true;
                        }
                    }
                }

                // right-to-left diagonal (/)
                for (let i = 0; i < SIZE - 4; i++) {
                    for (let j = 4; j < SIZE; j++) {
                        if (
                            state.board[i][j] &&
                            state.board[i + 1][j - 1] === state.board[i][j] &&
                            state.board[i + 2][j - 2] === state.board[i][j] &&
                            state.board[i + 3][j - 3] === state.board[i][j] &&
                            state.board[i + 4][j - 4] === state.board[i][j]
                        ) {
                            state.isFinished = true;
                        }
                    }
                }
            }

            const { x, y } = action.payload;
            const newBoard = [...state.board];
            if (state.isFinished) throw new Error("Game is finished");

            for (let i = 0; i < SIZE; i++) {
                for (let j = 0; j < SIZE; j++) {
                    if (i === x && j === y) {
                        // move validation
                        if (newBoard[i][j]) {
                            throw new Error(
                                `Square (${i}, ${j}) is already occupied by ${newBoard[i][j]}`
                            );
                        }

                        // if move is valid, do the following
                        let nextPlayer;
                        if (state.turn % 2 == 0) {
                            nextPlayer = "O";
                        } else {
                            nextPlayer = "X";
                        }
                        newBoard[i][j] = nextPlayer;
                        state.turn++;
                        checkWin(x, y);
                    }
                }
            }
            state.board = newBoard;
        },
    },
});
export const { onSquareClick } = gomokuSlice.actions;
export default gomokuSlice.reducer;
