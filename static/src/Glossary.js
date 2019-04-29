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

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import gloss from "./constants/terms.js";

class Glossary extends Component {
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  state = {
    open: false
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
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div>
            <IconButton
              color="default"
              onClick={this.handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
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
