import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import gmApp from "./reducers";

import "./App.css";
import Home from "./Home";
import DraftingPage from "./DraftingPage";
import Profile from "./Profile";

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

import { GoogleLogin, GoogleLogout } from "react-google-login";

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
    selectedTab: "Home",
    loggedIn: false,
    user: null
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
    const responseGoogle = response => {
      console.log(response.profileObj);

      this.setState({
        loggedIn: true,
        user: response.profileObj,
        selectedTab: "Profile"
      });
    };

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
                {this.state.loggedIn ? (
                  <GoogleLogout
                    buttonText="Logout"
                    onLogoutSuccess={response => {
                      this.setState({
                        loggedIn: false,
                        user: null,
                        selectedTab: "Home"
                      });
                    }}
                  />
                ) : (
                  <GoogleLogin
                    clientId="410077450126-6j2s5hc9343rmsaj3urj2j91ag3ljnhb.apps.googleusercontent.com"
                    buttonText="LOGIN WITH GOOGLE"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                  />
                )}
              </Toolbar>
            </AppBar>

            {this.state.selectedTab === "Home" && <Home />}
            {this.state.selectedTab === "Profile" && (
              <Profile user={this.state.user} />
            )}
            {this.state.selectedTab === "Drafting" && (
              <DraftingPage user={this.state.user} />
            )}
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
