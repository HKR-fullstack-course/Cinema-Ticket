import "../style/img.css";
import React, { Component } from "react";

class Image extends Component {
  render() {
    return (
      <img
        src={this.props.image_url}
        alt={this.props.alt + " image"}
        className="img"
      />
    );
  }
}
export default Image;
