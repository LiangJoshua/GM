import React, { Component } from "react";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const titleStyle = {
  paddingTop: 100,
  paddingBottom: 100
};

class Home extends Component {
  render() {
    return (
      <div align="center">
        <Typography variant="h1" style={titleStyle}>
          Sign-up now to Play!
        </Typography>
        <Button color="secondary" variant="contained">
          Sign up
        </Button>
      </div>
    );
  }
}

export default Home;
