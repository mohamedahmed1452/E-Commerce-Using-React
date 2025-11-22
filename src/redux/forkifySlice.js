import { createSlice } from "@reduxjs/toolkit";

const forkifySlice=createSlice({
  name: "forkify",
  initialState: { value: 0 },
  reducers: {
    add :function(state){
      state.value++
    }

  },
});
export const { increment, decrement, incrementByAmount } = forkifySlice.actions;
export default forkifySlice.reducer;