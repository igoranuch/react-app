import { createAsyncThunk } from "@reduxjs/toolkit";
import { tripService } from "../../services/tripService";
import { ITrip, TripPayload } from "../../types";

export const getOneTrip = createAsyncThunk("getOneTrip", async (payload: TripPayload) => {
  const { token, tripId } = payload;
  const trip: ITrip = await tripService.getOne(token, tripId);

  return { trip };
});
