import React, { Component } from "react";
import Image from "./Image";
import style from "../style/Card.module.css" //not used but still in effect

class Card extends Component {

    async handleClick(name) {
        console.log(`this is ${name}`);
    }

    render() {
        return (
            <div class={style.card}>
                <div class="style.card card-top "><Image image_url={this.props.image} alt={this.props.name} />
                </div>
                <h4 class="style.card card-bottom">{this.props.name}</h4>
                <br />
            </div>
        );
    }
}

export default Card;
