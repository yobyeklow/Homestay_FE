import { ILoginResponse } from "@/apis/auth.apis";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
    },
  },
  reducers: {
    handleLogin: (state, action: PayloadAction<any>) => {
      state.login.currentUser = action.payload;
    },
  },
});

export const { handleLogin } = authSlice.actions;
export default authSlice.reducer;
