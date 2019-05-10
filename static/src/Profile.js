import React, { Component } from "react";
import axios from "axios";

import { players } from "./constants/players.js";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

const styles = {
  avatar: {
    margin: 50,
    width: 150,
    height: 150
  },
  gridlist: {
    width: 500,
    height: 450
  },
  grid: {
    paddingTop: "50px",
    paddingLeft: "30px",
    paddingRight: "30px",
    color: "orangered"
  }
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      draftedPlayers: [],
      loggedIn: false
    };
  }

  componentDidMount() {
    if (this.props.user) {
      const requestUrl =
        "http://127.0.0.1:5000/get_team?user=" + this.props.user.name;
      axios.get(requestUrl).then(response => {
        console.log(response);
        this.setState({
          draftedPlayers: response.data,
          loggedIn: true
        });
      });
    } else {
      this.setState({ loggedIn: false });
    }
  }
  render() {
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        {this.state.loggedIn ? (
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Avatar
              alt={this.props.user.name}
              src={this.props.user.imageUrl}
              style={styles.avatar}
            />
            <Typography variant="h2">{this.props.user.name}</Typography>
            <Typography variant="h3" style={styles.grid}>
              Your team
            </Typography>
            <div style={styles.grid}>
              <GridList cols={3} style={styles.gridlist} cellHeight={160}>
                {this.state.draftedPlayers.map(drafted => {
                  const playerInfo = players.find(
                    player => player.name == drafted
                  );
                  return (
                    <GridListTile key={playerInfo.info.img}>
                      <img src={playerInfo.info.img} />
                      <GridListTileBar title={playerInfo.name} />
                    </GridListTile>
                  );
                })}
                ;
              </GridList>
            </div>
          </Grid>
        ) : (
          <Typography>Please log in!</Typography>
        )}
      </Grid>
    );
  }
}

export default Profile;
