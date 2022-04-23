import React, { Component } from "react";

class Image extends Component {
  render() {
    return <img src={this.props.image} alt="alt text" />;
  }
}
export default Image;
