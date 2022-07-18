import React from "react";

function Booking({ booking, deleteBooking }) {
  const formatDate = (date) => {
    let d = new Date(date);
    return ["0" + d.getDate(), "0" + (d.getMonth() + 1), "" + d.getFullYear()]
      .map((component) => (component.length <= 3 ? component.slice(-2) : component))
      .join(".");
  };

  return (
    <li className="booking">
      <h3 className="booking__title">{booking.trip.title}</h3>
      <span className="booking__guests">{booking.guests} guests</span>
      <span className="booking__date">{formatDate(booking.date)}</span>
      <span className="booking__total">{booking.totalPrice} $</span>
      <button onClick={() => deleteBooking(booking.id)} className="booking__cancel" title="Cancel booking">
        <span className="visually-hidden"></span>×
      </button>
    </li>
  );
}

export default Booking;
