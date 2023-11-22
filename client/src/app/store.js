// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import gomokuReducer from "../slices/gomokuSlice";

export const store = configureStore({
  reducer: {
    gomoku: gomokuReducer,
  },
});
