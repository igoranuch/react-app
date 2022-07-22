import { useState } from "react";
import { ITrip } from "../../types";
import { AppDispatch, RootState } from "../../store/store";
import { ICreatedBooking } from "../../types";
import { useSelector, useDispatch } from "react-redux";
import { addBooking } from "../../store/bookings/actions";

type ModalProps = {
  trip: ITrip | undefined;
  toggleModal: () => void;
};

const Modal: React.FC<ModalProps> = ({ trip, toggleModal }) => {
  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const { token, user } = useSelector((state: RootState) => state.auth);

  const handleGuests = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuests(Number(e.target.value));
  };

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (token && user && trip) {
      const booking: ICreatedBooking = {
        tripId: trip.id,
        userId: user.id,
        guests: guests,
        date: date,
      };

      dispatch(addBooking({ token, booking }));
    }

    toggleModal();
  };

  const getMinDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    return date.toISOString().split("T")[0];
  };

  return (
    <div className="modal">
      <div className="trip-popup">
        <button onClick={toggleModal} className="trip-popup__close">
          ×
        </button>
        <form onSubmit={handleSubmit} className="trip-popup__form" autoComplete="off">
          <div className="trip-info">
            <h3 className="trip-info__title">{trip?.title}</h3>
            <div className="trip-info__content">
              <span className="trip-info__duration">
                <strong>{trip?.duration}</strong> days
              </span>
              <span className="trip-info__level">{trip?.level}</span>
            </div>
          </div>
          <label className="trip-popup__input input">
            <span className="input__heading">Date</span>
            <input onChange={handleDate} name="date" type="date" min={getMinDate()} required />
          </label>
          <label className="trip-popup__input input">
            <span className="input__heading">Number of guests</span>
            <input
              onChange={handleGuests}
              name="guests"
              type="number"
              min="1"
              max="10"
              defaultValue={guests}
              required
            />
          </label>
          <span className="trip-popup__total">
            Total: <output className="trip-popup__total-value">{trip && guests * trip.price}</output>
          </span>
          <button className="button" type="submit">
            Book a trip
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
