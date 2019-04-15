import React, { Component } from "react";
import PropTypes from 'prop-types';
import { players } from "./constants/players.js";

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

function PlayerInfoPage(props) {
  const { classes } = props;
  return (
    <div>
      <Avatar src={players[1].img} className={classes.bigAvatar} />
      <Typography variant="h1" style={titleStyle}>{players[0].name}</Typography>
    </div>
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