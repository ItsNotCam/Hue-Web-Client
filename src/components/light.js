import React from "react";
import { SketchPicker } from "react-color";
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

import Green from "@material-ui/core/colors/green";

import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";

const url = "http://192.168.1.12/api/eXbpUKQhYxGRtQRgDKAVlVUzyv0BO8WS5erAYWnu";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default class Light extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      on: props.on,
      bri: props.bri,
      name: props.name,
      id: props.id,
      color: props.color,
      hsl: props.hsl,
      set: false,
    };
  }

  toggle_on = () => {
    const new_state = !this.state.on;

    axios({
      method: "PUT",
      url: `${url}/lights/${this.state.id}/state`,
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
      url: `${url}/lights/${this.state.id}/state`,
      data: {
        bri: bri
      }
    });
  };

  render() {
    if (!this.state.set && this.state.color == null) {
      this.setState({ set: true });
      console.log(this.state.color);
    }

    const { on, bri, color } = this.state;
    var rgb = color != null ? { r: color.r, g: color.g, b: color.b } : null;

    const style = {
      padding: "10px",
      marginBottom: "30px",
      backgroundColor: color != null ? `rgb(${color.r}, ${color.g}, ${color.b})` : "",
      borderRadius: "10px"
    };

    return (
      <Typography
        component="div"
        variant="body1"
        style={style}
      >
        <Grid item xs={12}>
          <Container>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={on}
                    onChange={this.toggle_on}
                    color="primary"
                  />
                }
                label={this.state.name}
                labelPlacement="start"
                style={{
                  color: "black"
                }}
              />
              <FormControl>
                <Slider
                  value={!on ? 0 : bri}
                  max={254}
                  onChange={this.change_bri}
                  disabled={!on}
                  valueLabelFormat={`${parseInt((bri / 255) * 100)}%`}
                  valueLabelDisplay="auto"
                />
              </FormControl>
              {/* <FormControl>
              <SketchPicker color={rgb} />
            </FormControl> */}
            </FormGroup>
          </Container>
        </Grid>
      </Typography>
    );
  }
}
