import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../style/MoviePage.module.css";
import api from "../api/api";
import Image from "./Image";

import Auth from "../_helper/Auth";
import { Navigate } from "react-router-dom";

const MoviePage = () => {
  const { _id } = useParams();

  //Movie data
  const [movie, setMove] = useState({ data: [] });

  //Array of data time
  const [time, setMovieTime] = useState([]);
  //User ID
  const [user, setUser] = useState();

  //Local movie Related data
  const [price, setPrice] = useState({ price: "" });
  const [seat, setNumberSeat] = useState();
  const [movie_id, setMovieID] = useState("");
  const [people, setMoviePeoples] = useState(0);

  //Message handlers
  const [errorMessage, setErrorMessage] = useState("");

  //Result
  const [finalPrice, setMovieFinalPrice] = useState();

  const handleTimeChange = (e) => {
    setMovieID(e.target.value);
    const searchIndex = time.find((t) => t._id === e.target.value);
    setPrice({ price: searchIndex.ticket_price });
    if (!searchIndex.number_of_seats) setNumberSeat(0);
    else setNumberSeat(searchIndex.number_of_seats);
  };
  const handleNumPeoplesChange = (e) => {
    setMoviePeoples(e.target.value);
  };

  const totalCost = (a, b) => {
    return a * b;
  };

  const bookTicket = () => {
    if (seat == 0 || movie_id == "" || people <= 0) return;

    api.post("/ticket/add_ticket", {
      customer_id: user,
      movie_id: movie_id,
      number_of_seats: Math.floor(people),
    });
  };

  useEffect(() => {
    setUser(Auth.getID());
    api.get(`/movie/${_id}`).then((response) => {
      setMove({ data: response.data.body });
      setMovieTime(response.data.body.time);
    });
    if (seat === 0) setErrorMessage("There are no more seat available");
    else {
      if (!people.people || !price.price)
        setErrorMessage("Please fill the data");
      else {
        setMovieFinalPrice(totalCost(people.people, price.price));
        setErrorMessage(`Seat left: ${seat} Total cost will be ${finalPrice} `);
      }
    }
  }, [_id, people.people, price.price, finalPrice, seat]);

  return (
    <div>
      {!Auth.isAuthenticated || !Auth.isUser ? (
        <Navigate replace to="/404"></Navigate>
      ) : (
        <div className={styles.container}>
          <Image image_url={movie.data.image_url} alt={movie.data.name} />
          <h3 className={styles.name_label}>{movie.data.name}</h3>
          {/* <h3>{user}</h3> */}
          <h5 className={styles.genre_label}>Genre: {movie.data.movie_type}</h5>
          <h5>Rate: {movie.data.rate}</h5>
          <h5>Releases date: {movie.data.release_date}</h5>
          <h5>Directors: {movie.data.director}</h5>
          <h5>
            Description: <br /> <br />
            <span className={styles.description}>{movie.data.description}</span>
          </h5>
          <h5>Movie budget: {movie.data.budget} Million dollars</h5>
          <h5>
            Actors: <br /> {[movie.data.main_actors].toString()}
          </h5>
          <h3 className={styles.timing}>Select The Time</h3>
          <div className={styles.book_container}>
            <div className={styles.drop_down}>
              <select onChange={handleTimeChange} className={styles.drop_down}>
                <option value={people} onChange={handleNumPeoplesChange}>
                  <span className={styles.label_list}>Pick a date </span>
                </option>
                {time.map((t, key) => (
                  <option
                    value={t._id}
                    key={key}
                    className={styles.label_drop_list}
                  >
                    Date:
                    {"     "} {t.show_time.split("T")[0]}
                    {"     "}
                    Time:
                    {t.show_time.split("T")[1]}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="number"
              min="0"
              onChange={handleNumPeoplesChange}
              className={styles.price_list}
            />
            <p>{errorMessage}</p>
            <button onClick={bookTicket} className={styles.btn}>
              Book Ticket
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviePage;
