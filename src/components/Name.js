import React from "react";

const axios = require("axios");

class Name extends React.Component {
  state = { name: null };
  constructor(props) {
    super(props);

    this.SECOND = 1000;
    this.THREE_SECONDS = 3 * this.SECOND;
  }

  sendRequest = async () => {
    const response = await axios.get("http://localhost:5000/fake/name");
    this.setState({ name: response.data });
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.sendRequest(), this.THREE_SECONDS);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return <div>{this.state.name}</div>;
  }
}

export default Name;
