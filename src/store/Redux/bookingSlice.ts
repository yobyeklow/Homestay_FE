import { ILoginResponse } from "@/apis/auth.apis";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    adult: 0,
    children: 0,
  },
  reducers: {
    incrementAdultNumber: (state, { payload }) => {
      state.adult += 1;
    },
    incrementChildrenNumber: (state, { payload }) => {
      state.children += 1;
    },
    decrementAdultNumber: (state, { payload }) => {
      state.adult -= 1;
    },
    decrementChildrenNumber: (state, { payload }) => {
      state.children += 1;
    },
  },
});

export const {
  incrementAdultNumber,
  incrementChildrenNumber,
  decrementAdultNumber,
  decrementChildrenNumber,
} = bookingSlice.actions;
export default bookingSlice.reducer;
