import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../style/MoviePage.module.css"
import api from "../api/api"

const MoviePage = () => {
    const { _id } = useParams()
    const [movie, setMove] = useState({ data: [], })
    const [time, setMovieTime] = useState({ time: [] })

    const countries = [

        { label: "Kenya", value: "Kenya", id: 1 },
        { label: "India", value: "India", id: 2 },
        { label: "Botswana", value: "Botswana", id: 3 }
    ]

    const [countryReg, setCountryReg] = useState('')

    const handleCountryChange = (e) => {
        setCountryReg(e.target.id)


    }


    useEffect(() => {
        api.get(`/movie/${_id}`)
            .then(response => setMove({ data: response.data.body, time: response.data.body.time }))
    }, [_id]);

    return (
        <div>
            <div className="App">
                {countryReg}
                <br />
                <select onChange={handleCountryChange}>
                    <option value=""> -- Select a Country -- </option>

                    {countries.map((countryReg) => <option value={countryReg.value}>{countryReg.label}</option>)}
                </select>

            </div>

            <div className={styles.container}>
                <h3>{movie.data.name}</h3>
                <h5>Genre: {movie.data.movie_type}</h5>
                <h5>Rate: {movie.data.rate}</h5>
                <h5>Releases date: {movie.data.release_date}</h5>
                <h5>Directors: {movie.data.director}</h5>
                <h5>Description: {movie.data.description}</h5>
                <h5>Movie budget: {movie.data.budget} million dollars</h5>
                <h5>Actors: {[movie.data.main_actors].toString()}</h5>
                {movie.time && movie.time.map((time) => new Map([]))}
                <h3>Buy ticket</h3>
                <div>
                    <button >Book ticket</button>
                </div>


            </div>
        </div>
    )
}

export default MoviePage