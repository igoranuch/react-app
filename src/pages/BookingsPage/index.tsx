import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Booking from "../../components/Booking";
import Loader from "../../components/Loader";
import { getAllBookings, deleteBooking } from "../../store/bookings/actions";
import { AppDispatch, RootState } from "../../store/store";
import { IBooking, StateStatus } from "../../types";

function BookingsList() {
  const [bookingsState, setBookings] = useState<IBooking[] | null>(null);
  const [deletedBookingId, setDeletedBookingId] = useState<string | null>(null);

  const dispatch: AppDispatch = useDispatch();
  const { bookings, status, isDeleted } = useSelector((state: RootState) => state.bookings);
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    token && !bookingsState && dispatch(getAllBookings(token));
  }, []);

  useEffect(() => {
    if (status === StateStatus.SUCCESS && bookings) {
      setBookings(bookings);
    }

    if (isDeleted === StateStatus.SUCCESS && deletedBookingId && bookingsState) {
      setBookings(bookingsState.filter((booking) => booking.id !== deletedBookingId));
    }
  }, [status, isDeleted]);

  if (status === StateStatus.LOADING) {
    return <Loader />;
  }

  const deleteBookingDom = (bookingId: string) => {
    if (token) {
      dispatch(deleteBooking({ token, bookingId }));
      setDeletedBookingId(bookingId);
    }
  };

  return (
    <main className="bookings-page">
      <h1 className="visually-hidden">Travel App</h1>
      <ul className="bookings__list">
        {bookingsState &&
          bookingsState.map((booking) => {
            return <Booking booking={booking} deleteBooking={deleteBookingDom} key={booking.id} />;
          })}
      </ul>
    </main>
  );
}

export default BookingsList;
