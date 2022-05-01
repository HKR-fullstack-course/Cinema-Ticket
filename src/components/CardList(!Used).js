import React, { Component } from "react";

import Card from "./Card";

import api from "../api/api";


class CardList extends Component {
  state = { movies: [] };

  componentDidMount = async () => {
    const response = await api.get(`/all_movies/:${this.props.genre}`);
    this.setState({ movies: response.data.body });
  };

  render() {
    const movieCard = this.state.movies.map((movie, index) => {
      return (
        <Card name={movie.name} _id={movie._id} key={index} rate={movie.rate} />
      );
    });
    return <div>{movieCard}</div>;
  }
}

export default CardList;
