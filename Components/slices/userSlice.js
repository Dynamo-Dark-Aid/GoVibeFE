import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    completedCount: 0,
  },
  reducers: {
    incrementCompletedCount(state, action) {
      state.completedCount += 1;
    },
    resetCompletedCount(state) {
      state.completedCount = 0;
    },
  },
});

export const { incrementCompletedCount, resetCompletedCount } =
  userSlice.actions;

export default userSlice.reducer;
