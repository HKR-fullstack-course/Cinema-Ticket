import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../style/MoviePage.module.css"
import api from "../api/api"

const MoviePage = () => {
    const { _id } = useParams()
    const [movie, setMove] = useState({ data: [], })
    const [time, setMovieTime] = useState([])
    const [price, setMoviePrice] = useState({ price: '' })
    const [people, setMoviePeoples] = useState({ people: '' })
    const [finalPrice, setMovieFinalPrice] = useState('')

    const handlePriceChange = (e) => {
        setMoviePrice({ price: e.target.value })
    }
    const handleNumPeoplesChange = (e) => {
        const result = e.target.value.replace(/\D/g, '');
        setMoviePeoples({ people: result })
    }

    const totalCost = (a, b) => {
        return a * b
    }
    const handleFinalCostChange = () => {
        setMovieFinalPrice(totalCost((price.price), (people.people)));
    }

    useEffect(() => {
        api.get(`/movie/${_id}`)
            .then(response => { setMove({ data: response.data.body }); setMovieTime(response.data.body.time) })
    }, [_id]);

    return (
        <div>
            <div className={styles.container}>
                <h3>{movie.data.name}</h3>
                <h5>Genre: {movie.data.movie_type}</h5>
                <h5>Rate: {movie.data.rate}</h5>
                <h5>Releases date: {movie.data.release_date}</h5>
                <h5>Directors: {movie.data.director}</h5>
                <h5>Description: {movie.data.description}</h5>
                <h5>Movie budget: {movie.data.budget} million dollars</h5>
                <h5>Actors: {[movie.data.main_actors].toString()}</h5>
                <h3>Select a time</h3>
                <div>
                    <div className="drop_down">
                        <select onChange={handlePriceChange}>
                            <option value="">Pick a date</option>
                            {time.map((time) =>
                                <option value={time.ticket_price} key={time._id}>
                                    {time.show_time}
                                </option>)}
                        </select>
                    </div>
                    <input type="text" placeholder="Number of ticket" value={people.people} onChange={handleNumPeoplesChange} />
                    <button onClick={handleFinalCostChange}>
                        Book ticket
                    </button >
                </div>
                <p>Total amount to pay {finalPrice}kr</p>


            </div>
        </div>
    )
}

export default MoviePage