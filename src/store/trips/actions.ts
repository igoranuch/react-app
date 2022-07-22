import { createAsyncThunk } from "@reduxjs/toolkit";
import { tripService } from "../../services/tripService";
import { ITrip } from "../../types";

export const getAllTrips = createAsyncThunk("getAllTrips", async (token: string) => {
  const trips: ITrip[] = await tripService.getAll(token);

  return { trips };
});
