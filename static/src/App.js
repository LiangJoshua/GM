import React, { Component } from "react";
// import axios from "axios";

// import logo from "./logo.svg";
import "./App.css";
import "./DraftingPage";
import DraftingPage from "./DraftingPage";

class App extends Component {
  state = {
    data: ""
  };

  componentDidMount() {
    // axios.get("http://127.0.0.1:5000/").then(res => {
    //   this.setState({
    //     data: res.data
    //   });
    // });
  }

  render() {
    return (
      <div className="App-header">
        {/* <header className="App-header">
        </header> */}
        <DraftingPage user={["Faith Chau", "/FaithChau.jpeg"]} winRate="30%" 
                      draftedPlayers={draftedPlayers} playerLists={draftedPlayers}/>
      </div>
    );
  }
}
const draftedPlayers = [["Lebrom James", "/LebronJames.png"],
                          ["Stephen Curry", "/StephenCurry.png"],
                          ["Jimmy Butler", "/JimmyButler.png"],
                          ["Kemba Walker", "/KembaWalker.png"],
                          ["Luka Doncic", "/LukaDoncic.png"],
                          ["Lou Williams", "/LouWilliams.png"],
                          ["James Harden", "/JamesHarden.png"],
                          ["Kyrie Irving", "KyrieIrving.png"]];
export default App;
