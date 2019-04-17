import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import gmApp from "./reducers";

import "./App.css";
import Home from "./Home";
import DraftingPage from "./DraftingPage";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Drawer from "@material-ui/core/Drawer";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// import { players } from "./constants/players";
import PlayerInfoPage from "./playerInfoPage";

const store = createStore(gmApp);

const rootStyle = {
  flexGrow: 1,
  backgroundColor: "#282c34",
  backgroundRepeat: "repeat",
  paddingBottom: 100
};

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

class App extends Component {
  state = {
    anchorEl: false,
    selectedTab: "Home"
  };

  handleClick = event => {
    this.setState({ anchorEl: true });
  };

  handleClose = event => {
    console.log(event.nativeEvent.target.outerText);
    this.setState({
      anchorEl: false,
      selectedTab: event.nativeEvent.target.outerText
    });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <Provider store={store}>
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
                  <Drawer
                    open={this.state.anchorEl}
                    onClose={this.toggleDrawer}
                  >
                    <List style={{ width: 250, color: "#FFFF" }}>
                      <ListItem button onClick={this.handleClose}>
                        Profile
                      </ListItem>
                      <ListItem button onClick={this.handleClose}>
                        Drafting
                      </ListItem>
                      <ListItem button onClick={this.handleClose}>
                        Logout
                      </ListItem>
                    </List>
                  </Drawer>
                </div>
                <Typography
                  variant="h6"
                  color="inherit"
                  style={{ flexGrow: 1 }}
                >
                  GM
                </Typography>
                <Button color="inherit">Login</Button>
              </Toolbar>
            </AppBar>

            {this.state.selectedTab === "Home" && <Home />}
            {this.state.selectedTab === "Profile" && <Home />}
            {this.state.selectedTab === "Drafting" && <DraftingPage />}
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
