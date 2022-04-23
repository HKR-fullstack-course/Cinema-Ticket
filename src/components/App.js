import React from "react";
import "../style/App.css";

import Card from "./Card";

class App extends React.Component {
  render() {
    const str = '333dgdfgdf'
    return (
      <div className="App">
        <Card id={str}/>
       </div>
    );
  }
}

export default App;
