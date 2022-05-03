import React from "react";
import { useParams } from "react-router-dom";
import React from 'react'


const MoviePage = () => {
    const { name } = useParams()
    const [movie, setMove] = useState([])
    useEffects(() => {
        const results = api.get(`/all/movie/${name}`)
        setMove(results)
    }
        , []);

    return (
        <div>{movie.name}</div>
    )
}

export default MoviePage