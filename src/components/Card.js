import React, { Component } from "react";

import Image from "./Image";

import img_api from "../api/img";

class Card extends React.Component {
  state = { image: "" };

  arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  componentDidMount = async () => {
    // owner_id should be replaced with the owner of the image e.g. movie-id
    const response = await img_api.get(`/image?owner_id=${this.props.id}`);
    const base64Flag = "data:image/jpeg;base64,";
    const imageStr = this.arrayBufferToBase64(response.data.img.img.data.data);
    this.setState({ image: base64Flag + imageStr });
  };

  render() {
    return (
      <div>
        <Image image={this.state.image} />
      </div>
    );
  }
}

export default Card;
