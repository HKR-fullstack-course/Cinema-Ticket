import React, { Component } from 'react';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slider_style from "../style/Slider.module.css" //For some god forsaken reason it said not used but it is used in line 35

import api from "../api/api";

import Card from './Card'

export default class FilmSlider extends Component {
    state = { movies: [] }; //this is to get the data

    componentDidMount = async () => {
        const response = await api.get(`/all_movies/${this.props.movie_type}`);
        this.setState({ movies: response.data.body });
    };

    slider() { //Function to loop through and make each cell
        return this.state.movies.map((movie, index) =>
            <Card name={movie.name} _id={movie._id} key={index} rate={movie.rate} show_time={movie.show_time} movie_type={movie.movie_type} />
        );
    }


    render() {
        const settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            autoPlay: true
        };
        return (
            <div className={slider_style.container}>
                <h2> {this.props.title}</h2>
                <Slider {...settings}>
                    {this.slider()}
                </Slider>
            </div>
        );
    }
}