import React, { Component } from "react";
import Image from "./Image";
import api from "../api/api";

import style from "../style/Card.css" //not used but still in effect
import Link from "@hapi/joi/lib/types/link";

class Card extends Component {
  state = { image: "" };


  arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  componentDidMount = async () => {
    await api
      .get(`/image?owner_id=${this.props._id}`)
      .then((response) => {
        const base64Flag = "data:image/jpeg;base64,";
        const imageStr = this.arrayBufferToBase64(
          response.data.img.img.data.data
        );
        this.setState({ image: base64Flag + imageStr });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async handleClick(name) {
    console.log(`this is ${name}`);
  }

  render() {
    return (

      <Link to={"/movie/" + this.props.name}>
        <div class="style.card card-1">
          <div class="style.card card-top "><Image image={this.state.image} alt={this.props.name} />
          </div>
          <h4 class="style.card card-bottom">{this.props.name}</h4>
          <br />
        </div>
      </Link>
    );
  }
}

export default Card;
