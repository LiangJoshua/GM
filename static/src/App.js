import React, { Component } from "react";
import axios from "axios";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    data: ""
  };

  componentDidMount() {
    axios.get("http://127.0.0.1:5000/").then(res => {
      this.setState({
        data: res.data
      });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>{this.state.data}</p>
        </header>
      </div>
    );
  }
}

export default App;
