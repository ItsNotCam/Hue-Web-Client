import React from "react";
import axios from "axios";

import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { Switch, Slider, Grid } from "@mui/material";

import {url} from "../config";

export interface ILightProps {
  name: string;
  id: number;
  on: boolean;
  bri: number;
  color: {
    r: number,
    g: number,
    b: number
  }
}

export interface ILightState {
  on: boolean;
  bri: number;
  color: {
    r: number,
    g: number,
    b: number
  }
  set: boolean;
}


export default class Light extends React.Component<ILightProps, ILightState> {
  constructor(props: ILightProps) {
    super(props);
    this.state = {
      on: props.on,
      bri: props.bri,
      color: props.color,
      set: false
    };
  }

  toggleLights = async() => {
    const isOn = this.state.on;

    let res: any = await axios({
      method: "PUT",
      url: `${url}/lights/${this.props.id}/state`,
      data: { on: !isOn }
    });
    
    if(res.status === 200) {
      console.log(res.data);
      this.setState({ on: !isOn });
    }
  };

  changeBrightness = async (bri: number) => {
    let res: any = await axios({
      method: "PUT",
      url: `${url}/lights/${this.props.id}/state`,
      data: {
        bri: bri
      }
    });
    
    if(res.status === 200) {
      this.setState({ bri: bri })
    }
  };

  handleBrightnessChange = async(event: any) => {
    this.changeBrightness(Number.parseInt(event.target.value));
  }

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

    /*
        <Grid item xs={7} style={styles.name}>
        <Grid item xs={3} style={styles.switch}>
    */

    return (
      <Grid container style={styles.container}>
        <Grid item xs={2}>
          <EmojiObjectsIcon fontSize="large" />
        </Grid>
        <Grid item xs={7}>
          {this.props.name}
        </Grid>
        <Grid item xs={3}>
          <Switch
            checked={on}
            onChange={this.toggleLights}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12}>
          {on ? (
            <Slider
              value={!on ? 0 : bri}
              max={254}
              onChange={this.handleBrightnessChange}
              disabled={!on}
              valueLabelFormat={`${(bri / 255 * 100)}%`}
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
