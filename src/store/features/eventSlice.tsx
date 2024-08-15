import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface searchedEventsState {
  searchedEvents: any[] | null;
  initialEvents: any[] | null;
}

const initialState: searchedEventsState = {
  searchedEvents: null,
  initialEvents: null,
};

const searchedEventsSlice = createSlice({
  name: "searchedEvents",
  initialState,
  reducers: {
    setSearchedEvents(state, action: PayloadAction<any>) {
      state.searchedEvents = action.payload;
    },
    setInitialEvents(state, action: PayloadAction<any>) {
      state.initialEvents = action.payload;
    },

    resetSearchedEvents() {
      return initialState;
    },
  },
});

export const { resetSearchedEvents, setSearchedEvents, setInitialEvents } =
  searchedEventsSlice.actions;
export const selectSearchedEvents = (state: RootState) =>
  state.events.searchedEvents;
export const selectInitialEvents = (state: RootState) =>
  state.events.initialEvents;

export default searchedEventsSlice.reducer;
