import React, { Component } from "react";

import Slider from "./Slider";

import api from "../api/api";

class Parent_Slide extends Component {
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
      if (
        this.state.movie_type.includes(
          movie.movie_type.toUpperCase().trim()
        ) === false
      ) {
        this.state.movie_type.push(movie.movie_type.toUpperCase());
      }
    });
    const All = this.state.movie_type.map((genre, key) => {
      return <Slider title={genre} movie_type={genre} key={key}></Slider>;
    });
    return <div>{All}</div>;
  }
}

export default Parent_Slide;
