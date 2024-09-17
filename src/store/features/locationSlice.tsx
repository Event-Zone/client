import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface locationState {
  location: string | null;
}

const initialState: locationState = {
  location: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setlocation(state, action: PayloadAction<string | null>) {
      state.location = action.payload;
    },
  },
});

export const { setlocation } = locationSlice.actions;
export const selectlocation = (state: RootState) => state.location.location;

export default locationSlice.reducer;
