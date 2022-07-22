import TripCard from "../../components/Trip";
import Loader from "../../components/Loader";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { ITrip, StateStatus } from "../../types/index";
import { getAllTrips } from "../../store/trips/actions";
import { useSearchParams } from "react-router-dom";

function Homepage() {
  const [tripsState, setTrips] = useState<ITrip[] | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch: AppDispatch = useDispatch();
  const { trips, status } = useSelector((state: RootState) => state.trips);
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    token && dispatch(getAllTrips(token));
  }, []);

  useEffect(() => {
    setSearchParams("");

    if (status === StateStatus.SUCCESS && trips) {
      setTrips(trips);
    }
  }, [status, trips, dispatch]);

  if (status === StateStatus.LOADING) {
    return <Loader />;
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    searchParams.set(e.target.name, e.target.value);
    setSearchParams(searchParams);

    setTrips(filter(searchParams));
  };

  const filter = (searchParams: URLSearchParams) => {
    let filteredTrips = trips;

    searchParams.forEach((value, key) => {
      if (value !== "" && filteredTrips) {
        switch (key) {
          case "search":
            filteredTrips = filteredTrips.filter((trip) => trip.title.toLowerCase().startsWith(value.toLowerCase()));
            break;
          case "duration":
            switch (value) {
              case "0_x_5":
                filteredTrips = filteredTrips.filter((trip) => trip.duration < 5);
                break;
              case "5_x_10":
                filteredTrips = filteredTrips.filter((trip) => trip.duration >= 5 && trip.duration < 10);
                break;
              case "10_x":
                filteredTrips = filteredTrips.filter((trip) => trip.duration >= 10);
                break;
              default:
                break;
            }
            break;
          case "level":
            filteredTrips = filteredTrips.filter((trip) => trip.level === value);
            break;
          default:
            break;
        }
      }
    });

    return filteredTrips;
  };

  return (
    <main>
      <h1 className="visually-hidden">Travel App</h1>
      <section className="trips-filter">
        <h2 className="visually-hidden">Trips filter</h2>
        <form className="trips-filter__form" autoComplete="off">
          <label className="trips-filter__search input">
            <span className="visually-hidden">Search by name</span>
            <input onChange={handleFilterChange} name="search" type="search" placeholder="search by title" />
          </label>
          <label className="select">
            <span className="visually-hidden">Search by duration</span>
            <select onChange={handleFilterChange} name="duration">
              <option value="">duration</option>
              <option value="0_x_5">&lt; 5 days</option>
              <option value="5_x_10">&lt; 10 days</option>
              <option value="10_x">&ge; 10 days</option>
            </select>
          </label>
          <label className="select">
            <span className="visually-hidden">Search by level</span>
            <select onChange={handleFilterChange} name="level">
              <option value="">level</option>
              <option value="easy">easy</option>
              <option value="moderate">moderate</option>
              <option value="difficult">difficult</option>
            </select>
          </label>
        </form>
      </section>
      <section className="trips">
        <h2 className="visually-hidden">Trips List</h2>
        <ul className="trip-list">
          {tripsState &&
            tripsState.map((trip) => {
              return <TripCard trip={trip} key={trip.id} />;
            })}
        </ul>
      </section>
    </main>
  );
}

export default Homepage;
