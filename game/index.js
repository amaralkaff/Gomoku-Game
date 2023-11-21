/**
 * Gomoku class.
 *
 * How to use:
 *
 * ```
 * const game = new Gomoku();
 * game.move(4, 4);  // places "X" in [4, 4]
 * game.move(4, 5);  // places "O" in [4, 5]
 * ```
 *
 * Note that it automatically switches between "X" and "O"
 * for each move.
 *
 * To get a status of the game, use `.status`:
 *
 * ```
 * console.log(game.status)
 * > { board: [...], turn: 3, lastPlayer: "O", nextPlayer: "X", status: "Ongoing" }
 * ```
 *
 * `game.status.status` will change from "Ongoing" to "Finished"
 * if there is a winner on the board. If a game has a "Finished" status,
 * you can't make a move anymore, otherwise it will throw an error.
 */
class Gomoku {
    #turn;
    #SIZE;
    #isFinished;
    #board;
    constructor(size = 15) {
        this.#SIZE = size;
        this.#isFinished = false;
        this.#turn = 1;
        this.#board = this.#initBoard();
    }

    get status() {
        return {
            board: this.#board,
            turn: this.#turn,
            lastPlayer: this.#getLastPlayer(),
            nextPlayer: this.#getNextPlayer(),
            status: this.#isFinished ? "Finished" : "Ongoing",
        };
    }

    #getLastPlayer() {
        if (this.#turn == 1) return;
        if (this.#turn % 2 == 0) {
            return "X";
        } else {
            return "O";
        }
    }

    #getNextPlayer() {
        if (this.#isFinished) return;
        if (this.#turn % 2 == 0) {
            return "O";
        } else {
            return "X";
        }
    }

    #initBoard() {
        let board = [];
        for (let i = 0; i < this.#SIZE; i++) {
            board.push([]);
            for (let j = 0; j < this.#SIZE; j++) {
                board[i].push(null);
            }
        }
        return board;
    }

    /**
     * Checks for winning condition, and returns true
     * (if a win is found) or false (if a win is not found).
     */
    #checkWin(x, y) {
        // vertical
        for (let i = 0; i < this.#SIZE - 4; i++) {
            if (
                this.#board[i][y] &&
                this.#board[i + 1][y] === this.#board[i][y] &&
                this.#board[i + 2][y] === this.#board[i][y] &&
                this.#board[i + 3][y] === this.#board[i][y] &&
                this.#board[i + 4][y] === this.#board[i][y]
            ) {
                this.#isFinished = true;
                return true;
            }
        }
        // horizontal
        for (let i = 0; i < this.#SIZE - 4; i++) {
            if (
                this.#board[x][i] &&
                this.#board[x][i + 1] === this.#board[x][i] &&
                this.#board[x][i + 2] === this.#board[x][i] &&
                this.#board[x][i + 3] === this.#board[x][i] &&
                this.#board[x][i + 4] === this.#board[x][i]
            ) {
                this.#isFinished = true;
                return true;
            }
        }
        // diagonal
        // TODO: ...
        return false;
    }

    /* returns true if the next move results in a win, false otherwise */
    move(x, y) {
        if (this.#isFinished) throw new Error("Game is finished");

        for (let i = 0; i < this.#SIZE; i++) {
            for (let j = 0; j < this.#SIZE; j++) {
                if (i === x && j === y) {
                    // move validation (can't occupy the same square twice)
                    if (this.#board[i][j]) {
                        throw new Error(
                            `Square (${i}, ${j}) is already occupied by ${this.#board[i][j]}`
                        );
                    }

                    // if move is valid, do the following
                    this.#board[i][j] = this.#getNextPlayer();
                    this.#turn++;
                    return this.#checkWin(x, y);
                }
            }
        }
        return false;
    }

    /* reset back to the beginning of the game */
    reset() {
        this.#initBoard();
        this.#turn = 1;
        this.#isFinished = false;
    }
}

// const game = new Gomoku();
// game.move(0, 1);
// game.move(8, 8);
// game.move(1, 1);
// game.move(8, 7);
// game.move(2, 1);
// game.move(8, 6);
// game.move(3, 1);
// game.move(8, 5);
// game.move(4, 1);
// console.log(game.status);

export default Gomoku;
