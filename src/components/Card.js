import React, { Component } from "react";
import Image from "./Image";
import style from "../style/Card.module.css"; //not used but still in effect
import { Link } from "react-router-dom";

class Card extends Component {
  async handleClick(name) {
    console.log(`this is ${name}`);
  }

  render() {
    return (
      <Link to={"/movie/" + this.props._id}>
        <div className={style.card}>
          <div className="style.card card-top ">
            <Image image_url={this.props.image} alt={this.props.name} />
          </div>
          <h4 className="style.card card-bottom">{this.props.name}</h4>
          <br />
        </div>
      </Link>
    );
  }
}

export default Card;
