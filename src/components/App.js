import React from "react";
import "../style/App.css";

import Parent_slide from "./Parent_Slide"
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
        <Route path="/movie/:name" element={<Parent_slide />} />
      </div >
    );
  }
}

export default App;
