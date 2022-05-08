import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffects } from "react";
import api from "../api/api"

const MoviePage = () => {
    const { name } = useParams()
    const [movie, setMove] = useState([])
    useEffects(() => {
        const results = api.get(`/all_movie/${name}`)
        setMove(results)
    }
        , []);

    return (
        <div>{movie.name}</div>
    )
}

export default MoviePage