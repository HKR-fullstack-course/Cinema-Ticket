import React, { Component } from "react";

import Image from "./Image";

import img_api from "../api/img";
import api from "../api/api";

class Card extends React.Component {
  state = { image: "" };

  arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  componentDidMount = async () => {
    const response = await api.get(`/image?owner_id=${this.props._id}`);
    const base64Flag = "data:image/jpeg;base64,";
    const imageStr = this.arrayBufferToBase64(response.data.img.img.data.data);
    this.setState({ image: base64Flag + imageStr });
  };

  render() {
    return (
      <div>
        {this.props.name}
        <br />
        <Image image={this.state.image} alt={this.props.name} />
        <br />
        Rate: {this.props.rate}
        <br />
        <br />
      </div>
    );
  }
}

export default Card;
