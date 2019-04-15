import React, { Component } from "react";
import PropTypes from 'prop-types';
import { players } from "./constants/players.js";

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography";


import "./App.css";

const styles = {
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 50,
    width: 300,
    height: 300,
  },
};

const titleStyle = {
  paddingTop: 100,
  paddingBottom: 100
};

const stats = {
  "Pos": "SF",
  "Age": 34,
  "Tm": "LAL",
  "G": 39,
  "GS": 39,
  "MP": 34.9,
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
  const { classes } = props;
  return (
    <Grid container direction="column">
      <Avatar src="static/media/LebronJames.f72fec00.png" className={classes.bigAvatar} />
      <Typography variant="h1" style={titleStyle}>{players[0].name}</Typography>
    </Grid>
  );
}

PlayerInfoPage.propTypes = {
  classes: PropTypes.object.isRequired,
};
// class PlayerInfoPage extends Component {
//   state = {

//   };


//   initialize() {

//   }

//   componentDidMount() {

//   }

//   render() {

//     return (
//       <div>


//       </div>
//     );
//   }
// }

export default withStyles(styles)(PlayerInfoPage);