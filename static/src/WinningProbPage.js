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

import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import "./App.css";
import { yourTeam, opponentTeam } from "./constants/drafted";
import PlayerInfoPage from "./playerInfoPage";

class WinningProbPage extends Component {
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
        {/* <div>
          <Grid container direction="column" justify="space-evenly">
            <div style={{ textAlign: "center", color: "#FFF" }}>
              <h1>
                Team Rating
              </h1>
              <div>
                Insert stuff here
              </div>
              
            </div>
          </Grid>
        </div> */}
        <div>
          <Grid container direction="column">
            <div style={{ textAlign: "center", color: "blue" }}>
              <h1>Your team</h1>
              <h1 style={{color: "white"}}>Winning Probability</h1>
              <div>
                {yourTeam.map(p => {
                  return (
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
                      </ExpansionPanelActions>
                    </ExpansionPanel>
                  );
                })}
              </div>
            </div>
          </Grid>
        </div>
        <Avatar style={{width: 100,height: 100, marginTop: 250, fontSize: 30, color: "white", backgroundColor: "orangered"}}>V.S</Avatar>
        <div>
          <Grid container direction="column">
            <div style={{ textAlign: "center", color: "red" }}>
              <h1>Opponent team</h1>
              <h1 style={{color: "white"}}>Winning Probability</h1>
              <div>
                {opponentTeam.map(p => {
                  return (
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
                      </ExpansionPanelActions>
                    </ExpansionPanel>
                  );
                })}
              </div>
            </div>
          </Grid>
        </div>
      </Grid>
    );
  }
}

export default WinningProbPage;
