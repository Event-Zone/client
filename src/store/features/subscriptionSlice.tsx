import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface subscriptionState {
  subscription: any;
}

const initialState: subscriptionState = {
  subscription: null,
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setSubscriptionData(state, action: PayloadAction<subscriptionState>) {
      state.subscription = action.payload;
    },

    resetsubscriptionData() {
      return initialState;
    },
  },
});

export const { setSubscriptionData, resetsubscriptionData } =
  subscriptionSlice.actions;
export const selectSubscription = (state: RootState) =>
  state.subscription.subscription;

export default subscriptionSlice.reducer;
