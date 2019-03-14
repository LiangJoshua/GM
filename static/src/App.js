import React, { Component } from "react";

import "./App.css";
import "./DraftingPage";
import DraftingPage from "./DraftingPage";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import {players} from "./constants/players";

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
    anchorEl: null,
    drafting: false
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = event => {
    console.log(event.nativeEvent.target.outerText);
    this.setState({
      anchorEl: null,
      drafting: true
    });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <div style={rootStyle}>
          <AppBar position="static">
            <Toolbar>
              <div>
                <IconButton
                  color="inherit"
                  aria-label="Menu"
                  onClick={this.handleClick}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>Drafting</MenuItem>
                  <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                </Menu>
              </div>
              <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                GM
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>

          {!this.state.drafting ? (
            <div align="center">
              <Typography variant="h1" style={titleStyle}>
                Sign-up now to Play!
              </Typography>
              <Button color="secondary" variant="contained">
                Sign up
              </Button>>
            </div>
          ) : (
            <DraftingPage
              user={["Faith Chau", "/FaithChau.jpeg"]}
              winRate="30%"
            />
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
