import { createSlice } from "@reduxjs/toolkit";
import { StateStatus, IBookingsState } from "../../types";
import { addBooking, deleteBooking, getAllBookings } from "./actions";

const initialState: IBookingsState = {
  bookings: null,
  status: StateStatus.IDLE,
  isDeleted: StateStatus.IDLE,
};

const reducer = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    resetDeleted: (state) => {
      state.isDeleted = StateStatus.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBookings.pending, (state) => {
      state.status = StateStatus.LOADING;
    });

    builder.addCase(getAllBookings.fulfilled, (state, { payload }) => {
      const { bookings } = payload;

      state.status = StateStatus.SUCCESS;
      state.bookings = bookings;
    });

    builder.addCase(addBooking.pending, (state) => {
      state.status = StateStatus.LOADING;
    });

    builder.addCase(addBooking.fulfilled, (state, { payload }) => {
      const { newBooking } = payload;

      state.bookings ? state.bookings.push(newBooking) : (state.bookings = [newBooking]);
      state.status = StateStatus.SUCCESS;
    });

    builder.addCase(deleteBooking.fulfilled, (state, { payload }) => {
      const { bookingId } = payload;

      state.bookings
        ? (state.bookings = state.bookings.filter((booking) => booking.id !== bookingId))
        : (state.bookings = null);
      state.isDeleted = StateStatus.SUCCESS;
    });

    builder.addCase(deleteBooking.rejected, (state) => {
      state.isDeleted = StateStatus.ERROR;
    });
  },
});

export const { resetDeleted } = reducer.actions;
export default reducer.reducer;
