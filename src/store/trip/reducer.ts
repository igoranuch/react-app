import { createSlice } from "@reduxjs/toolkit";
import { StateStatus, ITripState } from "../../types";
import { getOneTrip } from "./actions";

const initialState: ITripState = {
  trip: null,
  status: StateStatus.IDLE,
};

const reducer = createSlice({
  name: "trip",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = StateStatus.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOneTrip.pending, (state) => {
      state.status = StateStatus.LOADING;
    });

    builder.addCase(getOneTrip.fulfilled, (state, { payload }) => {
      const { trip } = payload;

      state.status = StateStatus.SUCCESS;
      state.trip = trip;
    });
  },
});

export const { reset } = reducer.actions;
export default reducer.reducer;
