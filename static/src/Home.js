import React, { Component } from "react";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = {
  titleStyle: {
    paddingBottom: 50,
    color: "orangered"
  },
  substitle: {
    paddingBottom: 20
  }
};
class Home extends Component {
  render() {
    return (
      <div align="center" style={{ paddingTop: 30 }}>
        <Typography style={styles.subtitle} variant="h3">
          the
        </Typography>
        <Typography variant="h1" style={styles.titleStyle}>
          General Manager.
        </Typography>
        <img src={require("./img/basketball.png")} height="300" width="200" />
      </div>
    );
  }
}

export default Home;
