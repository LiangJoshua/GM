import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

const styles = {
  avatar: {
    margin: 50,
    width: 150,
    height: 150
  }
};

function Profile(props) {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Avatar
        alt={props.user.name}
        src={props.user.imageUrl}
        style={styles.avatar}
      />
      <Typography variant="h1">{props.user.name}</Typography>
      <Typography variant="h2">Your team</Typography>
      //TODO display recent drafted team
    </Grid>
  );
}

export default Profile;
