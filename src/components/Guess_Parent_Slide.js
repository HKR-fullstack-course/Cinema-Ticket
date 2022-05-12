import React, { Component } from 'react';

import GuessSlider from './GuessSlider'

import api from '../api/api'

class Guess_Parent_Slide extends Component {
    state = { movies: [], movie_type: [] };
    //array of all possible movie type: 
    //Loop through the movies and check the 
    //movie type,make the slide based on movie type(switch case)
    //Put the movie element in a seperate array
    //Make many slide base on each array

    //extra: filter the current time with the possible time
    //extra: 
    // this.setState({
    //     movie_type: [...this.state.movie_type, movie.movie_type]
    // });
    componentDidMount = async () => {
        const response = await api.get(`/all_movies`);
        this.setState({ movies: response.data.body });
    };

    render() {
        this.state.movies.forEach((movie) => {
            if (this.state.movie_type.includes(movie.movie_type.toLowerCase()) === false) {
                this.state.movie_type.push(movie.movie_type.toLowerCase());
            }
        });
        const All = this.state.movie_type.map(genre => {
            return (
                <GuessSlider title={genre} movie_type={genre}></GuessSlider>
            )
        });
        return <div>{All}</div>;
    }
}

export default Guess_Parent_Slide