import React from "react";
import rawTrips from "../../data/trips.json";
import TripCard from "../../components/trip/tripCard";
import { useState, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";

let searchParams;

function Homepage() {
  useEffect(() => {
    searchParams = new URLSearchParams();
  }, []);

  const [trips, setTrips] = useState(rawTrips);

  // const [search, setSearchParams] = useSearchParams();

  // useEffect(() => {
  //   setSearchParams({});
  // }, []);

  // const handleFilter = (e) => {
  //   e.preventDefault();

  //   if (searchParams.has(e.target.name)) {
  //     setSearchParams(
  //       Object.fromEntries(
  //         Array.from(searchParams.entries()).map((entry) => {
  //           if (entry[0] === e.target.name) {
  //             return [entry[0], e.target.value];
  //           } else return entry;
  //         })
  //       )
  //     );
  //   } else {
  //     setSearchParams({
  //       [e.target.name]: e.target.value,
  //     });
  //   }

  //   console.log(Array.from(searchParams.entries()));

  //   setTrips(filter(Array.from(searchParams.entries())));
  // };

  const handleFilterChange = (e) => {
    e.preventDefault();

    e.target.value === "duration" || e.target.value === "level"
      ? searchParams.set(`${e.target.name}`, "")
      : searchParams.set(`${e.target.name}`, e.target.value);

    setTrips(filter(searchParams));
  };

  const filter = (searchParams) => {
    let filteredTrips = rawTrips;

    for (const param of searchParams) {
      const [name, value] = param;

      if (value !== "") {
        switch (name) {
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
            }
            break;
          case "level":
            filteredTrips = filteredTrips.filter((trip) => trip.level === value);
            break;
        }
      }
    }

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
            <input name="search" type="search" placeholder="search by title" onChange={handleFilterChange} />
          </label>
          <label className="select">
            <span className="visually-hidden">Search by duration</span>
            <select name="duration" onChange={handleFilterChange}>
              <option value="">duration</option>
              <option value="0_x_5">&lt; 5 days</option>
              <option value="5_x_10">&lt; 10 days</option>
              <option value="10_x">&ge; 10 days</option>
            </select>
          </label>
          <label className="select">
            <span className="visually-hidden">Search by level</span>
            <select name="level" onChange={handleFilterChange}>
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
