import React, { Component } from 'react';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../style/Slider2.css"


import Card from './Card'

export default class FilmSlider extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3
        };
        return (
            <div className="container">
                <h2> {this.props.title}</h2>
                <Slider {...settings}>
                    <div>
                        <h3>movie 1</h3>
                    </div>
                    <div>
                        <h3>movie 2</h3>
                    </div>
                    <div>
                        <h3>movie 3</h3>
                    </div>
                    <div>
                        <h3>movie 4</h3>
                    </div>
                    <div>
                        <h3>movie 5</h3>
                    </div>
                </Slider>
            </div>
        );
    }
}