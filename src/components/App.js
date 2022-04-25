import React from "react";
import "../style/App.css";

import CardList from "./CardList";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <CardList />
      </div>
    );
  }
}

export default App;
