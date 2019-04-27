import React, { Component } from "react";
import { players } from "./constants/players.js";
import Glossary from "./Glossary.js";

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

import "./App.css";

const styles = {
  avatar: {
    margin: 50,
    width: 300,
    height: 300
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
    color: "#000000",
    backgroundColor: deepOrange[500]
  },
  text: {
    paddingTop: 25,
    paddingBottom: 25
  },
  modal: {
    width: 400,
    height: 400,
    overflow: "scroll"
  },
  table: {
    minWidth: 300
  }
};

function PlayerInfoPage(props) {
  let statistics1 = [];
  let statistics2 = [];
  let statKeys = Object.keys(props.info.stats);
  let halfLength = statKeys.length / 2;
  for (let i = 0; i < halfLength; i++) {
    statistics1.push(
      <ListItem>
        <ListItemAvatar>
          <Avatar style={styles.wordAvatar}>{statKeys[i]}</Avatar>
        </ListItemAvatar>
        <Typography variant="h3" style={styles.title}>
          {props.info.stats[statKeys[i]]}
        </Typography>
      </ListItem>
    );
    statistics2.push(
      <ListItem>
        <ListItemAvatar>
          <Avatar style={styles.wordAvatar}>{statKeys[i + halfLength]}</Avatar>
        </ListItemAvatar>
        <Typography variant="h3" style={styles.title}>
          {props.info.stats[statKeys[i + halfLength]]}
        </Typography>
      </ListItem>
    );
  }

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Avatar src={props.info.img} style={styles.avatar} />
      <Typography variant="h1" style={styles.title}>
        {props.name}
      </Typography>
      <Grid
        container
        direction="column"
        justify="center"
        spacing={4}
        alignItems="center"
      >
        <Typography variant="h3" style={styles.title}>
          Basic Info
        </Typography>
        <Glossary />
      </Grid>

      <Grid container justify="space-evenly">
        <List>
          <ListItem>
            <Avatar style={styles.wordAvatar}>Pos</Avatar>
            <Typography variant="h3" style={styles.title}>
              {props.info.basicInfo.Position}
            </Typography>
          </ListItem>
          <ListItem>
            <Avatar style={styles.wordAvatar}>Age</Avatar>
            <Typography variant="h3" style={styles.title}>
              {props.info.basicInfo.Age}
            </Typography>
          </ListItem>
          <ListItem>
            <Avatar style={styles.wordAvatar}>Tm</Avatar>
            <Typography variant="h3" style={styles.title}>
              {props.info.basicInfo.Team}
            </Typography>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <Avatar style={styles.wordAvatar}>G</Avatar>
            <Typography variant="h3" style={styles.title}>
              {props.info.gameStats.G}
            </Typography>
          </ListItem>
          <ListItem>
            <Avatar style={styles.wordAvatar}>GS</Avatar>
            <Typography variant="h3" style={styles.title}>
              {props.info.gameStats.GS}
            </Typography>
          </ListItem>
          <ListItem>
            <Avatar style={styles.wordAvatar}>MPG</Avatar>
            <Typography variant="h3" style={styles.title}>
              {props.info.gameStats.MPG}
            </Typography>
          </ListItem>
        </List>
      </Grid>
      <Typography variant="h3" style={styles.title}>
        Statistics
      </Typography>

      <Grid container justify="space-evenly">
        <List>{statistics1}</List>
        <List>{statistics2}</List>
      </Grid>
    </Grid>
  );
}

export default PlayerInfoPage;
