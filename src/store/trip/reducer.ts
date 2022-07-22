import { createReducer } from "@reduxjs/toolkit";
import { StateStatus, ITripState } from "../../types";
import { getOneTrip } from "./actions";

const initialState: ITripState = {
  trip: null,
  status: StateStatus.IDLE,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getOneTrip.pending, (state) => {
    state.status = StateStatus.LOADING;
  });

  builder.addCase(getOneTrip.fulfilled, (state, { payload }) => {
    const { trip } = payload;

    state.status = StateStatus.SUCCESS;
    state.trip = trip;
  });
});

export { reducer };
