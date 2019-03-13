import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import "./App.css";

class DraftingPage extends Component {
  state = {
    draftedPlayers: [],
    playerLists: [],
    userProfile: []
  };

  initialize = this.initialize.bind(this);

  initialize() {
    let drafted = [];
    drafted.push(
      <p style={{ fontSize: 50, color: "blue" }}>Currently Drafted</p>
    );
    this.props.draftedPlayers.forEach(player => {
      drafted.push(<img className="ProfilePic" src={player[1]} alt="logo" />);
      drafted.push(<p>{player[0]}</p>);
    });

    let profile = [];
    profile.push(
      <div>
        <img
          key="NBA"
          src={"/NBA.jpg"}
          alt="logo"
          style={{ width: 114, height: 75 }}
        />
      </div>
    );
    profile.push(
      <div>
        <img className="UserPic" src={this.props.user[1]} alt="logo" />
      </div>
    );
    profile.push(<p className="username">{this.props.user[0]}</p>);
    profile.push(
      <p style={{ fontSize: 20 }}>Win rate: {this.props.winRate}</p>
    );

    let players = [];
    // players.push(<p style={{ fontSize: 50, color: "orangered" }}>Players</p>);
    // this.props.playerLists.forEach(player => {
    //   players.push(<p>{player}</p>)
    // });
    let length = this.props.playerLists.length;
    if (length % 2 === 0) {
      for (let i = 0; i < length; i += 2) {
        players.push(
          <Grid container direction="row" justify="space-evenly">
            <div>
              <img
                className="ProfilePic"
                src={this.props.playerLists[i][1]}
                alt="logo"
              />
              <p>{this.props.playerLists[i][0]}</p>
            </div>
            <div>
              <img
                className="ProfilePic"
                src={this.props.playerLists[i + 1][1]}
                alt="logo"
              />
              <p>{this.props.playerLists[i + 1][0]}</p>
            </div>
          </Grid>
        );
      }
    }

    this.setState({
      draftedPlayers: drafted,
      userProfile: profile,
      playerLists: players
    });
  }

  componentDidMount() {
    this.initialize();
  }

  render() {
    let { draftedPlayers, userProfile, playerLists } = this.state;

    return (
      <div>
        <Grid container direction="column">
          <div style={{ textAlign: "center", color: "orangered" }}>
            <h1>Draft Players</h1>
            {playerLists}
          </div>
          <div>
            <Grid container direction="row">
              <div className="DraftingPage">{userProfile}</div>
              <div className="Playerlist">{draftedPlayers}</div>
            </Grid>
          </div>
        </Grid>
      </div>
    );
  }
}

export default DraftingPage;
