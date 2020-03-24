import React from "react";
import axios from "axios";

import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import {
  Switch,
  FormGroup,
  FormControlLabel,
  FormControl,
  Slider,
  Typography,
  Grid,
  Box,
  Container
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import url from "./config";

export default class Light extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      on: props.on,
      bri: props.bri,
      color: props.color,
      set: false
    };
  }

  toggle_on = () => {
    const new_state = !this.state.on;

    axios({
      method: "PUT",
      url: `${url}/lights/${this.props.id}/state`,
      data: {
        on: new_state
      }
    }).then(() => {
      this.setState({ on: new_state });
    });
  };

  change_bri = (event, bri) => {
    this.setState({
      bri: bri
    });

    axios({
      method: "PUT",
      url: `${url}/lights/${this.props.id}/state`,
      data: {
        bri: bri
      }
    });
  };

  render() {
    const { on, bri, color } = this.state;
    const { r, g, b } = color;

    const style = {
      container: {
        margin: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        backgroundColor: color != null ? `rgb(${r}, ${g}, ${b})` : "",
        borderRadius: "10px"
      },
      icon: {
        marginLeft: 30
      },
      iconContainer: {
        textAlign: "start"
      },
      switch: {
        textAlign: "end"
      }
    };

    return (
      <Grid container style={style.container}>
        <Grid item xs={6} style={style.iconContainer}>
          <EmojiObjectsIcon
            fontSize="large"
            color={on ? "primary" : "disabled"}
          />
        </Grid>
        <Grid item xs={6} style={style.switch}>
          <FormControlLabel
            control={
              <Switch checked={on} onChange={this.toggle_on} color="primary" />
            }
            label={this.props.name}
            labelPlacement="start"
            style={{color: "black"}}
          />
          ;
        </Grid>
        <Grid item xs={12} >
          <Slider
            value={!on ? 0 : bri}
            max={254}
            onChange={this.change_bri}
            disabled={!on}
            valueLabelFormat={`${parseInt((bri / 255) * 100)}%`}
            valueLabelDisplay="auto"
          />
        </Grid>
      </Grid>
    );
  }
}
