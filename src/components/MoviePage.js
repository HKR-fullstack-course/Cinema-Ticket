import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffects } from "react";
import styles from "../style/MoviePage.module.css"
import api from "../api/api"

const MoviePage = () => {
    const { _id } = useParams()
    const [movie, setMove] = useState([])

    const sayHello = () => {
        console.log("Hello")
    }
    return (
        <div>
            <div className={styles.container}>
                <h3>{_id}</h3>
                <h5>Genre</h5>
                <h5>Rate:{ }</h5>
                <h5>Releases date:{ }</h5>
                <h5>Directors:{ }</h5>
                <h5>Description:{ }</h5>
                <h5>Movie budget:{ }</h5>
                <h5>Ticket price:{ }</h5>
                <h5>Age range:{ }</h5>
                <h3>Buy ticket</h3>
                <div>
                    <h5>Pick a date</h5>
                    <button onClick={sayHello}>Book ticket</button>
                </div>
            </div>
        </div>
    )
}

export default MoviePage