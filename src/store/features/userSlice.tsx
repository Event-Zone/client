import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserState {
  token: string | null;
  user: any;
}

const initialState: UserState = {
  token: null,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<UserState>) {
      return { ...state, ...action.payload };
    },
    updateUserData(state, action: PayloadAction<UserState>) {
      state.user = action.payload;
    },
    resetUserData() {
      return initialState;
    },
  },
});

export const { setUserData, resetUserData, updateUserData } = userSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;

export default userSlice.reducer;
