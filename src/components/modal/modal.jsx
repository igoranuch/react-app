import React, { useState } from "react";

function Modal({ trip, hide }) {
  const [guests, setGuests] = useState(1);

  const handleGuests = (e) => {
    setGuests(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    hide();
  };

  return (
    <div className="modal">
      <div className="trip-popup">
        <button onClick={hide} className="trip-popup__close">
          ×
        </button>
        <form onSubmit={handleSubmit} className="trip-popup__form" autoComplete="off">
          <div className="trip-info">
            <h3 className="trip-info__title">{trip.title}</h3>
            <div className="trip-info__content">
              <span className="trip-info__duration">
                <strong>{trip.duration}</strong> days
              </span>
              <span className="trip-info__level">{trip.level}</span>
            </div>
          </div>
          <label className="trip-popup__input input">
            <span className="input__heading">Date</span>
            <input name="date" type="date" min={new Date().toISOString().split("T")[0]} required />
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
            Total: <output className="trip-popup__total-value">{guests * trip.price}</output>
          </span>
          <button className="button" type="submit">
            Book a trip
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
