import { useState } from "react";
import { useParams } from "react-router-dom";
import rawTrips from "../../data/trips.json";
import Modal from "../../components/Modal";
import { ITrip } from "../../types/index";

function Trip() {
  const { tripId } = useParams();
  const [showModal, setShowModal] = useState(false);

  const trip: ITrip | undefined = rawTrips.find((trip) => trip.id === tripId);

  const toggleModal = () => {
    showModal ? setShowModal(false) : setShowModal(true);
  };

  return (
    <main className="trip-page">
      <h1 className="visually-hidden">Travel App</h1>
      <div className="trip">
        <img src={trip?.image} className="trip__img" alt="trip_image" />
        <div className="trip__content">
          <div className="trip-info">
            <h3 className="trip-info__title">{trip?.title}</h3>
            <div className="trip-info__content">
              <span className="trip-info__duration">
                <strong>{trip?.duration}</strong> days
              </span>
              <span className="trip-info__level">{trip?.level}</span>
            </div>
          </div>
          <div className="trip__description">{trip?.description}</div>
          <div className="trip-price">
            <span></span>
            <strong className="trip-price__value">{trip?.price} $</strong>
          </div>
          <button onClick={toggleModal} className="trip__button button">
            Book a trip
          </button>
        </div>
      </div>
      {showModal && <Modal trip={trip} toggleModal={toggleModal} />}
    </main>
  );
}

export default Trip;
