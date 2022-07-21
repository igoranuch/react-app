import rawTrips from "../../data/trips.json";
import TripCard from "../../components/Trip";
import { useState, useEffect } from "react";

// let searchParams: URLSearchParams;

function Homepage() {
  // useEffect(() => {
  //   searchParams = new URLSearchParams();
  // }, []);

  const [trips, setTrips] = useState(rawTrips);

  // const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
  //   e.preventDefault();

  //   e.target.value === "duration" || e.target.value === "level"
  //     ? searchParams.set(`${e.target.name}`, "")
  //     : searchParams.set(`${e.target.name}`, e.target.value);

  //   setTrips(filter(searchParams));
  // };

  // const filter = (searchParams: URLSearchParams) => {
  //   let filteredTrips = rawTrips;

  //   for (const param of searchParams) {
  //     const [name, value] = param;

  //     if (value !== "") {
  //       switch (name) {
  //         case "search":
  //           filteredTrips = filteredTrips.filter((trip) => trip.title.toLowerCase().startsWith(value.toLowerCase()));
  //           break;
  //         case "duration":
  //           switch (value) {
  //             case "0_x_5":
  //               filteredTrips = filteredTrips.filter((trip) => trip.duration < 5);
  //               break;
  //             case "5_x_10":
  //               filteredTrips = filteredTrips.filter((trip) => trip.duration >= 5 && trip.duration < 10);
  //               break;
  //             case "10_x":
  //               filteredTrips = filteredTrips.filter((trip) => trip.duration >= 10);
  //               break;
  //             default:
  //               return filteredTrips;
  //           }
  //           break;
  //         case "level":
  //           filteredTrips = filteredTrips.filter((trip) => trip.level === value);
  //           break;
  //         default:
  //           return filteredTrips;
  //       }
  //     }
  //   }

  //   return filteredTrips;
  // };

  return (
    <main>
      <h1 className="visually-hidden">Travel App</h1>
      <section className="trips-filter">
        <h2 className="visually-hidden">Trips filter</h2>
        <form className="trips-filter__form" autoComplete="off">
          <label className="trips-filter__search input">
            <span className="visually-hidden">Search by name</span>
            <input name="search" type="search" placeholder="search by title" />
          </label>
          <label className="select">
            <span className="visually-hidden">Search by duration</span>
            <select name="duration">
              <option value="">duration</option>
              <option value="0_x_5">&lt; 5 days</option>
              <option value="5_x_10">&lt; 10 days</option>
              <option value="10_x">&ge; 10 days</option>
            </select>
          </label>
          <label className="select">
            <span className="visually-hidden">Search by level</span>
            <select name="level">
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
          {trips.map((trip) => {
            return <TripCard trip={trip} key={trip.id} />;
          })}
        </ul>
      </section>
    </main>
  );
}

export default Homepage;