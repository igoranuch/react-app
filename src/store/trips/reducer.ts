import { createSlice } from "@reduxjs/toolkit";
import { StateStatus, ITripsState } from "../../types";
import { getAllTrips } from "./actions";

const initialState: ITripsState = {
  trips: null,
  status: StateStatus.IDLE,
};

const reducer = createSlice({
  name: "trips",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = StateStatus.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTrips.pending, (state) => {
      state.status = StateStatus.LOADING;
    });

    builder.addCase(getAllTrips.fulfilled, (state, { payload }) => {
      const { trips } = payload;

      state.status = StateStatus.SUCCESS;
      state.trips = trips;
    });
  },
});

export const { reset } = reducer.actions;
export default reducer.reducer;
