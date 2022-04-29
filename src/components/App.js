import React from "react";
import "../style/App.css";

import Parent_Slide from "./Parent_Slide"
import CardList from "./CardList";
import Slider from "./Slider"
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
        <Slider title="Everything test" />
      </div >
    );
  }
}

export default App;
