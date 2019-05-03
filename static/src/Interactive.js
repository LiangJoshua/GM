import React, { Component } from "react";
import io from "socket.io-client";
import axios from "axios";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

import strategies from "./constants/strategies";

console.log(strategies.offense);

const styles = {
  paper: {
    width: 700,
    height: 50,
    paddingTop: 20,
    paddingBottom: 50,
    paddingLeft: 50,
    paddingRight: 50,
    position: "fixed",
    bottom: 10,
    textAlign: "center"
  },
  formControl: {
    minWidth: 120,
    paddingRight: 10
  },
  movePaper: {
    width: 700,
    height: 40,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: 10,
    backgroundColor: "#fafafa"
  },
  move: {
    color: "black",
    paddingLeft: 20,
    paddingTop: 10
  }
};
class Interactive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      moves: [],
      move: "",
      player: "",
      draftedPlayers: [],
      defense: "disabled"
    };

    this.sendMessage = ev => {
      ev.preventDefault();
      this.socket.emit("SEND_MESSAGE", {
        user: this.props.user.imageUrl,
        userName: this.props.user.name,
        action: this.state.move + " " + this.state.player
      });
    };

    this.socket = io("http://127.0.0.1:5000/");

    this.socket.on("RECEIVE_MESSAGE", function(data) {
      addMessage(data);
    });

    const addMessage = data => {
      console.log(data);
      this.setState({
        moves: [...this.state.moves, data],
        defense: !this.state.defense,
        player: "",
        move: ""
      });
      console.log(this.state.messages);
    };
  }

  componentDidMount() {
    const requestUrl =
      "http://127.0.0.1:5000/get_team?user=" + this.props.user.name;
    axios.get(requestUrl).then(response => {
      console.log(response);
      this.setState({
        draftedPlayers: response.data
      });
    });
  }

  handleMoveChange = event => {
    this.setState({
      move: event.target.value
    });
  };

  handlePlayerChange = event => {
    this.setState({ player: event.target.value });
  };

  render() {
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <Typography variant="h2"> Game </Typography>
        <div>
          {this.state.moves.map(move => {
            return (
              <Paper style={styles.movePaper}>
                <Grid container direction="row">
                  <Avatar src={move.user} />
                  <Typography variant="h6" style={styles.move}>
                    {move.userName}: {move.action}
                  </Typography>
                </Grid>
              </Paper>
            );
          })}
        </div>
        <Paper style={styles.paper}>
          <Typography variant="h5">
            {this.state.defense
              ? "Pick a player to guard"
              : "Pick a player to complete a strategy"}
          </Typography>
          {this.state.defense ? (
            <FormControl disabled style={styles.formControl}>
              <InputLabel>Move</InputLabel>
              <Select
                value={this.state.move}
                onChange={this.handleMoveChange}
                autoWidth
              >
                {Object.keys(strategies.offense).map(o => {
                  return <MenuItem value={o}>{o}</MenuItem>;
                })}
              </Select>
            </FormControl>
          ) : (
            <FormControl style={styles.formControl}>
              <InputLabel>Move</InputLabel>
              <Select
                value={this.state.move}
                onChange={this.handleMoveChange}
                autoWidth
              >
                {Object.keys(strategies.offense).map(o => {
                  return <MenuItem value={o}>{o}</MenuItem>;
                })}
              </Select>
            </FormControl>
          )}
          <FormControl style={styles.formControl}>
            <InputLabel>Player</InputLabel>
            <Select
              value={this.state.player}
              onChange={this.handlePlayerChange}
            >
              {this.state.draftedPlayers.map(p => {
                return <MenuItem value={p}>{p}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <Button
            color="primary"
            variant="contained"
            onClick={this.sendMessage}
          >
            Submit
          </Button>
        </Paper>
      </Grid>
    );
  }
}

export default Interactive;
