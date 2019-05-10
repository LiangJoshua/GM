import React, { Component } from "react";
import axios from "axios";

import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import "./App.css";
import { players } from "./constants/players.js";
import PlayerInfoPage from "./playerInfoPage.js";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class DraftingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      draftedPlayers: [],
      showLearnMore: false,
      showPlayer: null,
      showPlayerInfo: null,
      submission: false,
      winningProb: null
    };
  }

  handleDialogOpen = event => {
    console.log(event);
    this.setState({
      showLearnMore: true,
      showPlayer: event.name,
      showPlayerInfo: event.info
    });
  };

  handleDialogClose = () => {
    this.setState({ showLearnMore: false });
  };

  handleSubmissionClose = () => {
    this.setState({ submission: false });
  };

  handleWinningClose = () => {
    this.setState({ winningProb: null });
  };

  handleSubmit = () => {
    this.setState({ submission: false });
    const data = {
      user: this.props.user.name,
      team: this.state.draftedPlayers
    };

    axios.post("http://127.0.0.1:5000/store_team", data).then(response => {
      console.log(response);
      this.setState({ winningProb: response.data });
    });
  };

  render() {
    return (
      <Grid
        container
        direction="row"
        alignItems="stretch"
        justify="space-evenly"
      >
        <div>
          <Grid container direction="row">
            <div style={{ textAlign: "center", color: "orangered" }}>
              <h1>Draft Players</h1>
              <div>
                {players.map(p => {
                  return !this.state.draftedPlayers.includes(p.name) ? (
                    <ExpansionPanel key={p.name}>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Avatar src={p.info.img} />
                        <Typography>{p.name} </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <div>
                          <Typography>
                            FG%: {(p.info.stats["FG%"] * 100).toFixed(2)}%
                          </Typography>
                          <Typography>
                            3P%: {(p.info.stats["3P%"] * 100).toFixed(2)}%
                          </Typography>
                        </div>
                      </ExpansionPanelDetails>
                      <Divider />
                      <ExpansionPanelActions>
                        <Button
                          size="small"
                          onClick={() => {
                            this.handleDialogOpen({
                              name: p.name,
                              info: p.info
                            });
                          }}
                        >
                          Learn More
                        </Button>

                        <Button
                          size="small"
                          color="primary"
                          variant="contained"
                          onClick={() => {
                            this.setState({
                              draftedPlayers: this.state.draftedPlayers.concat(
                                p.name
                              ),
                              submission:
                                this.state.draftedPlayers.length + 1 === 5
                                  ? true
                                  : false
                            });
                          }}
                        >
                          Draft
                        </Button>
                      </ExpansionPanelActions>
                    </ExpansionPanel>
                  ) : null;
                })}
              </div>
            </div>
          </Grid>
        </div>

        <Dialog
          fullScreen
          open={this.state.showLearnMore}
          onClose={this.handleDialogClose}
          TransitionComponent={Transition}
        >
          <IconButton
            color="default"
            onClick={this.handleDialogClose}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
          <PlayerInfoPage
            name={this.state.showPlayer}
            info={this.state.showPlayerInfo}
          />
        </Dialog>

        <div>
          <Grid container direction="column" justify="space-evenly">
            <div style={{ textAlign: "center" }}>
              <h1 style={{ color: "#FFF" }}>
                Your Players ({this.state.draftedPlayers.length}/5)
              </h1>

              {this.state.draftedPlayers.map(drafted => {
                const playerInfo = players.find(
                  player => player.name == drafted
                );

                return (
                  <Card style={{ marginTop: 10 }}>
                    <div
                      style={{
                        textAlign: "center",
                        display: "inline-block"
                      }}
                    >
                      <Avatar
                        src={playerInfo.info.img}
                        style={{
                          width: 60,
                          height: 60
                        }}
                      />
                    </div>
                    <CardContent>
                      <Typography color="textSecondary">
                        {playerInfo.name}
                      </Typography>
                    </CardContent>
                    <CardActions
                      style={{
                        textAlign: "center",
                        display: "inline-block"
                      }}
                    >
                      <Button
                        size="small"
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                          this.setState({
                            draftedPlayers: this.state.draftedPlayers.filter(
                              p => p != playerInfo.name
                            )
                          });
                        }}
                      >
                        Remove
                      </Button>
                    </CardActions>
                  </Card>
                );
              })}
            </div>
          </Grid>

          <Dialog
            open={this.state.submission}
            onClose={this.handleSubmissionClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you ready to submit?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You have drafted 5 players. Click 'Submit' to view your winning
                probability.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleSubmissionClose} color="primary">
                Not Ready
              </Button>
              <Button onClick={this.handleSubmit} color="primary" autoFocus>
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={this.state.winningProb}
            onClose={this.handleSubmissionClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle
              id="alert-dialog-title"
              style={{
                textAlign: "center"
              }}
            >
              Your chance of winning
            </DialogTitle>
            <DialogContent>
              <DialogContentText variant="h1">
                {parseFloat(this.state.winningProb).toFixed(2)}%
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleWinningClose} color="primary">
                OKAY
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Grid>
    );
  }
}

export default DraftingPage;
