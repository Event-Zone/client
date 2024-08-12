import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface searchedEventsState {
  searchedEvents: any[] | null;
}

const initialState: searchedEventsState = {
  searchedEvents: null,
};

const searchedEventsSlice = createSlice({
  name: "searchedEvents",
  initialState,
  reducers: {
    setSearchedEvents(state, action: PayloadAction<any>) {
      state.searchedEvents = action.payload;
    },

    resetSearchedEvents() {
      return initialState;
    },
  },
});

export const { resetSearchedEvents, setSearchedEvents } =
  searchedEventsSlice.actions;
export const selectSearchedEvents = (state: RootState) =>
  state.events.searchedEvents;

export default searchedEventsSlice.reducer;
