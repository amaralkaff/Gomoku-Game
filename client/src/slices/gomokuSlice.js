import { createSlice } from "@reduxjs/toolkit";
import { database } from "../firebase/firebaseConfig";
import { ref, set, onValue } from "firebase/database";

const initialState = {
  isFinished: false,
  turn: 1,
  board: Array(15)
    .fill(null)
    .map(() => Array(15).fill(null)),
  lastMoveByX: {},
  lastMoveByO: {},
  disabled: (() => {
    if (localStorage.getItem("user_id") == "p2") return true;
    return false;
  })(),
};

export const gomokuSlice = createSlice({
  name: "gomoku",
  initialState,
  reducers: {
    onSquareClick: (state, action) => {
      const SIZE = 15;
      const { x, y } = action.payload;

      const upMove = ref(database, "gomokuGame");
      onValue(upMove, (snapshot) => {
        const data = snapshot.val();
      });

      if (state.isFinished) throw new Error("Game is finished");
      if (state.board[x][y]) {
        throw new Error(`Square (${x}, ${y}) is already occupied`);
      }

      if (state.turn % 2 == 0) {
        state.board[x][y] = "O";
        state.lastMoveByO = { x, y };
      } else {
        state.board[x][y] = "X";
        state.lastMoveByX = { x, y };
      }
      state.turn++;

      // Check for win or draw
      if (checkWin(state.board, x, y, SIZE) || state.turn > SIZE * SIZE) {
        state.isFinished = true;
      }

      // check disabled
      const currPlayer = localStorage.getItem("user_id");
      if (currPlayer == "p1" && state.turn % 2 == 0) {
        state.disabled = true;
      } else if (currPlayer == "p2" && state.turn % 2 != 0) {
        state.disabled = true;
      } else {
        state.disabled = false;
      }

      // Update Firebase
      set(ref(database, "gomokuGame"), {
        p1: { join: false, lastMove: state.lastMoveByX },
        p2: { join: false, lastMove: state.lastMoveByO },
        gameId: 1,
        status: state.isFinished,
        turn: state.turn,
      });
    },
    updateGameState: (state, action) => {
      return { ...state, ...action.payload };
    },
    reset: (state) => {
      state.isFinished = false;
      state.turn = 1;
      state.board = Array(15)
        .fill(null)
        .map(() => Array(15).fill(null));
      state.lastMoveByX = {};
      state.lastMoveByO = {};
      state.disabled = (() => {
        if (localStorage.getItem("user_id") == "p2") return true;
        return false;
      })();

      // Update Firebase
      set(ref(database, "gomokuGame"), {
        p1: { join: false, lastMove: state.lastMoveByX },
        p2: { join: false, lastMove: state.lastMoveByO },
        gameId: 1,
        status: state.isFinished,
        turn: state.turn,
      });
    },
  },
});

function checkWin(board, x, y, SIZE) {
  // check draw
  if (board.flat().filter((cell) => cell).length === SIZE * SIZE) {
    return true; // draw
  }

  // Checking functions
  const isEqual = (val1, val2, val3, val4, val5) =>
    val1 && val1 === val2 && val1 === val3 && val1 === val4 && val1 === val5;

  // vertical, horizontal, diagonal checks
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (
        // horizontal
        (j <= SIZE - 5 &&
          isEqual(
            board[i][j],
            board[i][j + 1],
            board[i][j + 2],
            board[i][j + 3],
            board[i][j + 4]
          )) ||
        // vertical
        (i <= SIZE - 5 &&
          isEqual(
            board[i][j],
            board[i + 1][j],
            board[i + 2][j],
            board[i + 3][j],
            board[i + 4][j]
          )) ||
        // diagonal down-right
        (i <= SIZE - 5 &&
          j <= SIZE - 5 &&
          isEqual(
            board[i][j],
            board[i + 1][j + 1],
            board[i + 2][j + 2],
            board[i + 3][j + 3],
            board[i + 4][j + 4]
          )) ||
        // diagonal up-right
        (i >= 4 &&
          j <= SIZE - 5 &&
          isEqual(
            board[i][j],
            board[i - 1][j + 1],
            board[i - 2][j + 2],
            board[i - 3][j + 3],
            board[i - 4][j + 4]
          ))
      ) {
        return true; // win
      }
    }
  }
  return false;
}

export const { onSquareClick, updateGameState, reset } = gomokuSlice.actions;

// export const initializeFirebaseListener = (dispatch) => {
//   onValue(ref(database, "gomokuGame"), (snapshot) => {
//     const data = snapshot.val();
//     if (data) {
//       dispatch(updateGameState(data));
//     }
//   });
// };

export default gomokuSlice.reducer;
