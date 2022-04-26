import React from "react";
import logo from "../img/logo.svg";
import "../style/App.css";
import FilmSlider from "./Slider"
import Name from "./Name";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          Name from Back-end : <Name />
        </header> */}
        <FilmSlider />
      </div>
    );
  }
}

export default App;
