import { useState } from "react";
import Booking from "../../components/Booking";
import rawBookings from "../../data/bookings.json";

function BookingsList() {
  const [bookings, setBookings] = useState(rawBookings);

  return (
    <main className="bookings-page">
      <h1 className="visually-hidden">Travel App</h1>
      <ul className="bookings__list">
        {bookings
          .sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          })
          .map((booking) => {
            return <Booking booking={booking} key={booking.id} />;
          })}
      </ul>
    </main>
  );
}

export default BookingsList;
