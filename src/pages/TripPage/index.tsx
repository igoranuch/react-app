import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import { AppDispatch, RootState } from "../../store/store";
import { getOneTrip } from "../../store/trip/actions";
import { ITrip, StateStatus } from "../../types/index";

function Trip() {
  const { tripId } = useParams<string>();

  const [tripState, setTrip] = useState<ITrip | null>(null);
  const [showModal, setShowModal] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const { trip, status, token } = useSelector((state: RootState) => ({
    status: state.trip.status,
    trip: state.trip.trip,
    token: state.auth.token,
  }));

  useEffect(() => {
    token && tripId && dispatch(getOneTrip({ token, tripId }));
  }, []);

  useEffect(() => {
    if (status === StateStatus.SUCCESS && trip) {
      setTrip(trip);
    }
  }, [status, trip]);

  if (status === StateStatus.LOADING) {
    return <Loader />;
  }

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
            <h3 className="trip-info__title">{tripState?.title}</h3>
            <div className="trip-info__content">
              <span className="trip-info__duration">
                <strong>{trip?.duration}</strong> days
              </span>
              <span className="trip-info__level">{tripState?.level}</span>
            </div>
          </div>
          <div className="trip__description">{tripState?.description}</div>
          <div className="trip-price">
            <span></span>
            <strong className="trip-price__value">{tripState?.price} $</strong>
          </div>
          <button onClick={toggleModal} className="trip__button button">
            Book a trip
          </button>
        </div>
      </div>
      {showModal && tripState && <Modal trip={tripState} toggleModal={toggleModal} />}
    </main>
  );
}

export default Trip;
