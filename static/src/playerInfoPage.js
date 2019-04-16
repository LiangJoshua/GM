import React, { Component } from "react";
import { players } from "./constants/players.js";

import deepOrange from '@material-ui/core/colors/deepOrange';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import "./App.css";

const styles = {
  avatar: {
    margin: 50,
    width: 300,
    height: 300,
  },
  title: {
    paddingTop: 50,
    paddingBottom: 50
  },
  wordAvatar: {
    width: 100,
    height: 100,
    margin: 50,
    fontSize: 30,
    color: '#000000',
    backgroundColor: deepOrange[500],
  },
  text: {
    paddingTop: 25,
    paddingBottom: 25
  },
  modal: {
    width: 400,
    height: 400,
    overflow: 'scroll',
  },
  table: {
    minWidth: 300
  }
};

const basicInfo = {
  "Position": "S.F.",
  "Age": 34,
  "Team": "LAL",
}

const gameStats = {
  "G": 39,
  "GS": 39,
  "MPG": 34.9,
}

const stats = {
  "FG": 9.8,
  "FGA": 19.2,
  "FG%": 0.513,
  "3P": 2.1,
  "3PA": 5.8,
  "3P%": 0.355,
  "2P": 7.7,
  "2PA": 13.3,
  "2P%": 0.582,
  "eFG%": 0.567,
  "FT": 5.1,
  "FTA": 7.4,
  "FT%": 0.679,
  "ORB": 0.9,
  "DRB": 7.7,
  "TRB": 8.6,
  "AST": 7.6,
  "STL": 1.3,
  "BLK": 0.6,
  "TOV": 3.5,
  "PF": 1.7,
  "PS/G": 26.8
}

function PlayerInfoPage(props) {
  let statistics1 = [];
  let statistics2 = [];
  let statKeys = Object.keys(stats);
  let halfLength = statKeys.length / 2;
  for (let i = 0; i < halfLength; i++) {
    statistics1.push(
      <ListItem>
        <ListItemAvatar>
          <Avatar style={styles.wordAvatar}>
            {statKeys[i]}
          </Avatar>
        </ListItemAvatar>
        <Typography variant="h3" style={styles.title}>
          {stats[statKeys[i]]}
        </Typography>
      </ListItem >
    );
    statistics2.push(
      <ListItem>
        <ListItemAvatar>
          <Avatar style={styles.wordAvatar}>
            {statKeys[i + halfLength]}
          </Avatar>
        </ListItemAvatar>
        <Typography variant="h3" style={styles.title}>
          {stats[statKeys[i + halfLength]]}
        </Typography>
      </ListItem >
    );
  }

  return (
    <Grid container direction="column" justify="center" alignItems="center" alignContent="center">
      <Avatar src={players[0].img} style={styles.avatar} />
      <Typography variant="h1" style={styles.title}>{players[0].name}</Typography>
      <Grid container direction="column" justify="center" spacing={4} alignItems="center">
        <Typography variant="h3" style={styles.title}>Basic Info</Typography>
        <Glossary />
      </Grid>
      <Grid container justify="space-evenly">
        <List>
          <ListItem>
            <Avatar style={styles.wordAvatar}>Pos</Avatar>
            <Typography variant="h3" style={styles.title}>{basicInfo.Position}</Typography>
          </ListItem>
          <ListItem>
            <Avatar style={styles.wordAvatar}>Age</Avatar>
            <Typography variant="h3" style={styles.title}>{basicInfo.Age}</Typography>
          </ListItem>
          <ListItem>
            <Avatar style={styles.wordAvatar}>Tm</Avatar>
            <Typography variant="h3" style={styles.title}>{basicInfo.Team}</Typography>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <Avatar style={styles.wordAvatar}>G</Avatar>
            <Typography variant="h3" style={styles.title}>{gameStats.G}</Typography>
          </ListItem>
          <ListItem>
            <Avatar style={styles.wordAvatar}>GS</Avatar>
            <Typography variant="h3" style={styles.title}>{gameStats.GS}</Typography>
          </ListItem>
          <ListItem>
            <Avatar style={styles.wordAvatar}>MPG</Avatar>
            <Typography variant="h3" style={styles.title}>{gameStats.MPG}</Typography>
          </ListItem>
        </List>
      </Grid>
      <Typography variant="h3" style={styles.title}>Statistics</Typography>
      <Grid container justify="space-evenly">
        <List>
          {statistics1}
        </List>
        <List>
          {statistics2}
        </List>
      </Grid>
    </Grid>
  );
}

const gloss = {
  "Rk": "Rank",
  "Pos": "Position",
  "Age": "Age of Player\n(Feb 1st of the season)",
  "Tm": "Team",
  "G": "Games",
  "GS": "Games Started",
  "MP": "Minutes Played Per Game",
  "FG": "Field Goals Per Game",
  "FGA": "Field Goal Attempts Per Game",
  "FG%": "Field Goal Percentage",
  "3P": "3-Point Field Goals Per Game",
  "3PA": "3-Point Field Goal Attempts Per Game",
  "3P%": "FG% on 3-Pt FGAs",
  "2P": "2-Point Field Goals Per Game",
  "2PA": "2-Point Field Goal Attempts Per Game",
  "2P%": "FG% on 2-Pt FGAs",
  "eFG%": "Effective Field Goal Percentage\n(3P is worth one more point than 2P)",
  "FT": "Free Throws Per Game",
  "FTA": "Free Throw Attempts Per Game",
  "FT%": "Free Throw Percentage",
  "ORB": "Offensive Rebounds Per Game",
  "DRB": "Defensive Rebounds Per Game",
  "TRB": "Total Rebounds Per Game",
  "AST": "Assists Per Game",
  "STL": "Steals Per Game",
  "BLK": "Blocks Per Game",
  "TOV": "Turnovers Per Game",
  "PF": "Personal Fouls Per Game",
  "PTS": "Points Per Game",
}

class Glossary extends Component {
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  state = {
    open: false,
  };

  handleOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  };

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
          <div style={styles.modal}>
            <Table style={styles.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Abbreviation</TableCell>
                  <TableCell align="left">Terminology</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows}
              </TableBody>
            </Table>
          </div>
        </Modal>
      </div>
    );
  }
}

export default PlayerInfoPage;