import React, { Component } from "react";
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
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import "./App.css";
import { players } from "./constants/players.js";
import PlayerInfoPage from "./playerInfoPage.js";

class DraftingPage extends Component {
  state = {
    draftedPlayers: [],
    showLearnMore: false,
    showPlayer: null,
    showPlayerInfo: null
  };

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
                    <ExpansionPanel id={p.name}>
                      <ExpansionPanelSummary
                        id={p.name}
                        expandIcon={<ExpandMoreIcon />}
                      >
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
                        <Dialog
                          fullScreen
                          open={this.state.showLearnMore}
                          onClose={this.handleDialogClose}
                        >
                          <IconButton
                            color="inherit"
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
                        <Button
                          size="small"
                          color="primary"
                          variant="contained"
                          onClick={() => {
                            this.setState({
                              draftedPlayers: this.state.draftedPlayers.concat(
                                p.name
                              )
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

        <div>
          <Grid container direction="column" justify="space-evenly">
            <div style={{ textAlign: "center" }}>
              <h1 style={{ color: "#FFF" }}>Your Players</h1>

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
        </div>
      </Grid>
    );
  }
}

export default DraftingPage;
