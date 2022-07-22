import { IBooking } from "../../types";

type BookingProps = {
  booking: IBooking;
  deleteBooking: (bookingId: string) => void;
};

const Booking: React.FC<BookingProps> = ({ booking, deleteBooking }) => {
  const formatDate = (date: string) => {
    let d = new Date(date);
    return ["0" + d.getDate(), "0" + (d.getMonth() + 1), "" + d.getFullYear()]
      .map((component) => (component.length <= 3 ? component.slice(-2) : component))
      .join(".");
  };

  const handleClick = () => {
    deleteBooking(booking.id);
  };

  return (
    <li className="booking">
      <h3 className="booking__title">{booking.trip.title}</h3>
      <span className="booking__guests">{booking.guests} guests</span>
      <span className="booking__date">{formatDate(booking.date)}</span>
      <span className="booking__total">{booking.totalPrice} $</span>
      <button onClick={handleClick} className="booking__cancel" title="Cancel booking">
        <span className="visually-hidden"></span>×
      </button>
    </li>
  );
};

export default Booking;
