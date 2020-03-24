import React from "react";
import axios from "axios";

import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import { Switch, Slider, Grid } from "@material-ui/core";

import url from "../config";

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
    axios({
      method: "PUT",
      url: `${url}/lights/${this.props.id}/state`,
      data: {
        on: !this.state.on
      }
    }).then(res => {
      this.setState({
        on: res.status == 200 ? !this.state.on : this.state.on
      });
    });
  };

  change_bri = (event, bri) => {
    const before = this.state.bri;

    this.setState({
      bri: bri
    });

    axios({
      method: "PUT",
      url: `${url}/lights/${this.props.id}/state`,
      data: {
        bri: bri
      }
    }).then(res => {
      if (res.status != 200) this.setState({ bri: before });
    });
  };

  render() {
    const { on, bri, color } = this.state;
    const { r, g, b } = color;

    const styles = {
      container: {
        margin: 0,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: on ? `rgb(${r}, ${g}, ${b})` : "gray",
        borderRadius: "10px",
        color: on ? "black" : "white"
      },
      icon: {
        marginLeft: 30
      },
      iconContainer: {
        textAlign: "start",
        color: on ? "black" : "white"
      },
      switch: {
        textAlign: "end"
      },
      slider: {
        paddingBottom: 0
      },
      name: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontSize: 15
      }
    };

    return (
      <Grid container style={styles.container}>
        <Grid item xs={2}>
          <EmojiObjectsIcon fontSize="large" />
        </Grid>
        <Grid item xs={7} style={styles.name}>
          {this.props.name}
        </Grid>
        <Grid item xs={3} style={styles.switch}>
          <Switch
            checked={on}
            onChange={this.toggle_on}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12}>
          {on ? (
            <Slider
              value={!on ? 0 : bri}
              max={254}
              onChange={this.change_bri}
              disabled={!on}
              valueLabelFormat={`${parseInt((bri / 255) * 100)}%`}
              valueLabelDisplay="auto"
              color="secondary"
              style={styles.slider}
            />
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    );
  }
}
