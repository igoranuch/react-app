import axios from "axios";
import API from "../common/api/api";
import { ITrip } from "../types";

export const tripService = {
  getAll: async function (token: string): Promise<ITrip[]> {
    const res = await axios.get(API.BASE_URL + API.GET_ALL_TRIPS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  },

  getOne: async function (token: string, tripId: string): Promise<ITrip> {
    const res = await axios.get(API.BASE_URL + API.GET_ONE_TRIP + tripId, {
      params: { tripId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  },
};
