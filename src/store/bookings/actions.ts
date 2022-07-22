import { createAsyncThunk } from "@reduxjs/toolkit";
import { bookingService } from "../../services/bookingService";
import { addBookingPayload, deleteBookingPayload, IBooking } from "../../types";

export const getAllBookings = createAsyncThunk("getAllBookings", async (token: string) => {
  const bookings: IBooking[] = await bookingService.getAll(token);

  return { bookings };
});

export const addBooking = createAsyncThunk("addBooking", async (payload: addBookingPayload) => {
  const { token, booking } = payload;

  const newBooking = await bookingService.addOne(token, booking);

  return { newBooking };
});

export const deleteBooking = createAsyncThunk("deleteBooking", async (payload: deleteBookingPayload) => {
  const { token, bookingId } = payload;

  const response = await bookingService.deleteOne(token, bookingId);

  return { response, bookingId };
});
