import axios from "axios";
import API from "../common/api/api";
import { IBooking, ICreatedBooking } from "../types";

export const bookingService = {
  getAll: async function (token: string): Promise<IBooking[]> {
    const res = await axios.get(API.BASE_URL + API.BOOKINGS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  },

  addOne: async function (token: string, booking: ICreatedBooking): Promise<IBooking> {
    const res = await axios.post(
      API.BASE_URL + API.BOOKINGS,
      { ...booking },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  },

  deleteOne: async function (token: string, bookingId: string): Promise<any> {
    const res = await axios.delete(API.BASE_URL + API.DELETE_BOOKING + bookingId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  },
};
