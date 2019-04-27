import React, { Component } from "react";

import deepOrange from "@material-ui/core/colors/deepOrange";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const gloss = {
  Rk: "Rank",
  Pos: "Position",
  Age: "Age of Player\n(Feb 1st of the season)",
  Tm: "Team",
  G: "Games",
  GS: "Games Started",
  MP: "Minutes Played Per Game",
  FG: "Field Goals Per Game",
  FGA: "Field Goal Attempts Per Game",
  "FG%": "Field Goal Percentage",
  "3P": "3-Point Field Goals Per Game",
  "3PA": "3-Point Field Goal Attempts Per Game",
  "3P%": "FG% on 3-Pt FGAs",
  "2P": "2-Point Field Goals Per Game",
  "2PA": "2-Point Field Goal Attempts Per Game",
  "2P%": "FG% on 2-Pt FGAs",
  "eFG%":
    "Effective Field Goal Percentage\n(3P is worth one more point than 2P)",
  FT: "Free Throws Per Game",
  FTA: "Free Throw Attempts Per Game",
  "FT%": "Free Throw Percentage",
  ORB: "Offensive Rebounds Per Game",
  DRB: "Defensive Rebounds Per Game",
  TRB: "Total Rebounds Per Game",
  AST: "Assists Per Game",
  STL: "Steals Per Game",
  BLK: "Blocks Per Game",
  TOV: "Turnovers Per Game",
  PF: "Personal Fouls Per Game",
  PTS: "Points Per Game"
};

class Glossary extends Component {
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  state = {
    open: false,
    goBack: false
  };

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    let rows = [];
    let glossKeys = Object.keys(gloss);
    for (let i = 0; i < glossKeys.length; i++) {
      rows.push(
        <TableRow key={i}>
          <TableCell component="th" scope="row">
            {glossKeys[i]}
          </TableCell>
          <TableCell align="left">{gloss[glossKeys[i]]}</TableCell>
        </TableRow>
      );
    }

    return (
      <div>
        <Button onClick={this.handleOpen}>Glossary</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          // justify="center"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Abbreviation</TableCell>
                  <TableCell align="left">Terminology</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{rows}</TableBody>
            </Table>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Glossary;
