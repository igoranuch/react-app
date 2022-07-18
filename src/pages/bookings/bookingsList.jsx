import React, { useState } from "react";
import Booking from "../../components/booking/booking";
import rawBookings from "../../data/bookings.json";

function BookingsList() {
  const [bookings, setBookings] = useState(rawBookings);

  const handleBookingDelete = (bookingId) => {
    setBookings(bookings.filter((booking) => bookingId !== booking.id));
  };

  return (
    <main className="bookings-page">
      <h1 className="visually-hidden">Travel App</h1>
      <ul className="bookings__list">
        {bookings
          .sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
          })
          .map((booking) => {
            return <Booking booking={booking} key={booking.id} deleteBooking={handleBookingDelete} />;
          })}
      </ul>
    </main>
  );
}

export default BookingsList;
