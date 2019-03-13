import React, { Component } from "react";
// import axios from "axios";

// import logo from "./logo.svg";

import "./App.css";
import "./DraftingPage";
import DraftingPage from "./DraftingPage";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const rootStyle = {
  flexGrow: 1,
  backgroundColor: "#282c34",
  backgroundRepeat: "repeat",
  paddingBottom: 100
};

const titleStyle = {
  paddingTop: 100,
  paddingBottom: 100
};

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

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
  /*
  <DraftingPage
    user={["Faith Chau", "/FaithChau.jpeg"]}
    winRate="30%"
    draftedPlayers={draftedPlayers}
    playerLists={draftedPlayers}
  />
  */

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div style={rootStyle}>
          <AppBar position="static">
            <Toolbar>
              <IconButton color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                GM
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
          <div align="center">
            <Typography variant="h1" style={titleStyle}>
              Sign-up now to Play!
            </Typography>
            <Button color="secondary" variant="contained">
              Sign-up
            </Button>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
const draftedPlayers = [
  ["Lebrom James", "/LebronJames.png"],
  ["Stephen Curry", "/StephenCurry.png"],
  ["Jimmy Butler", "/JimmyButler.png"],
  ["Kemba Walker", "/KembaWalker.png"],
  ["Luka Doncic", "/LukaDoncic.png"],
  ["Lou Williams", "/LouWilliams.png"],
  ["James Harden", "/JamesHarden.png"],
  ["Kyrie Irving", "KyrieIrving.png"]
];
export default App;
