import React, { Component } from "react";

import Card from "./Card";

import api from "../api/api";

class CardList extends React.Component {
  state = { movies: [] };

  componentDidMount = async () => {
    const response = await api.get(`/all_movies`);
    this.setState({ movies: response.data.body });
  };

  render() {
    const movieCard = this.state.movies.map((movie, index) => {
      console.log(movie);
      return (
        <Card name={movie.name} _id={movie._id} key={index} rate={movie.rate} />
      );
    });
    return <div>{movieCard}</div>;
  }
}

export default CardList;
