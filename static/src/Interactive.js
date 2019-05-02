import React, { Component } from "react";
import io from "socket.io-client";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

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
    backgroundColor: "#D84315"
  },
  move: {
    color: "black"
  }
};
class Interactive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      moves: [],
      move: "",
      player: ""
    };

    this.sendMessage = ev => {
      ev.preventDefault();
      this.socket.emit(
        "SEND_MESSAGE",
        this.props.user.name + " " + this.state.move + " " + this.state.player
      );
    };

    this.socket = io("http://127.0.0.1:5000/");

    this.socket.on("RECEIVE_MESSAGE", function(data) {
      addMessage(data);
    });

    const addMessage = data => {
      console.log(data);
      this.setState({ moves: [...this.state.moves, data] });
      console.log(this.state.messages);
    };
  }

  handleMoveChange = event => {
    this.setState({ move: event.target.value });
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
                <Typography variant="h5" style={styles.move}>
                  {move}
                </Typography>
              </Paper>
            );
          })}
        </div>
        <Paper style={styles.paper}>
          <Typography variant="h6">Your Move</Typography>
          <FormControl style={styles.formControl}>
            <InputLabel>Player</InputLabel>
            <Select
              value={this.state.player}
              onChange={this.handlePlayerChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl style={styles.formControl}>
            <InputLabel>Move</InputLabel>
            <Select
              value={this.state.move}
              onChange={this.handleMoveChange}
              autoWidth
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
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
