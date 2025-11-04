import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import forkifyReducer from "./forkifySlice";
export const createdStore=configureStore({
  reducer: { counterReducer, forkifyReducer },
});
