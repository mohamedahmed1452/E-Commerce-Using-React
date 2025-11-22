import { createSlice } from "@reduxjs/toolkit";

const counterSlice=createSlice({
  name: "counter",
  initialState: { counter: 0,age:0 }, 
    reducers: {
    increment: function(state) {
      console.log(state.counter);
      
      state.counter ++;
    },
    decrement: (state) => {
      state.counter --;
    },
    incrementByAmount: (state, action) => {
      state.counter += action.payload;
    },
  },
});
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;