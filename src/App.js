import React from "react";
import axios from "axios";

import Lights from "./components/lights";

import Container from "@material-ui/core/Container";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { green, grey, lightBlue } from "@material-ui/core/colors";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lights: null
    };
  }

  get_lights = () => {
    const url =
      "http://192.168.1.12/api/eXbpUKQhYxGRtQRgDKAVlVUzyv0BO8WS5erAYWnu";

    axios
      .get(`${url}/lights`)
      .then(resp => resp.data)
      .then(data => Object.keys(data).map(key => data[key]))
      .then(out => this.setState({ lights: out }));
  };

  rgb_to_xy = (red, green, blue) => {
    return getXY(red, green, blue);

    function getXY(red, green, blue) {
      if (red > 0.04045) {
        red = Math.pow((red + 0.055) / (1.0 + 0.055), 2.4);
      } else red = red / 12.92;

      if (green > 0.04045) {
        green = Math.pow((green + 0.055) / (1.0 + 0.055), 2.4);
      } else green = green / 12.92;

      if (blue > 0.04045) {
        blue = Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4);
      } else blue = blue / 12.92;

      var X = red * 0.664511 + green * 0.154324 + blue * 0.162028;
      var Y = red * 0.283881 + green * 0.668433 + blue * 0.047685;
      var Z = red * 0.000088 + green * 0.07231 + blue * 0.986039;
      var x = X / (X + Y + Z);
      var y = Y / (X + Y + Z);
      return [x, y];
    }
  };

  xy_to_rgb = (x, y, bri) => {
    let z, Y, X, Z, r, g, b, maxValue;

    z = 1.0 - x - y;
    Y = bri / 255.0; // Brightness of lamp
    X = (Y / y) * x;
    Z = (Y / y) * z;
    r = X * 1.612 - Y * 0.203 - Z * 0.302;
    g = -X * 0.509 + Y * 1.412 + Z * 0.066;
    b = X * 0.026 - Y * 0.072 + Z * 0.962;
    r =
      r <= 0.0031308
        ? 12.92 * r
        : (1.0 + 0.055) * Math.pow(r, 1.0 / 2.4) - 0.055;
    g =
      g <= 0.0031308
        ? 12.92 * g
        : (1.0 + 0.055) * Math.pow(g, 1.0 / 2.4) - 0.055;
    b =
      b <= 0.0031308
        ? 12.92 * b
        : (1.0 + 0.055) * Math.pow(b, 1.0 / 2.4) - 0.055;
    maxValue = Math.max(r, g, b);
    r /= maxValue;
    g /= maxValue;
    b /= maxValue;
    r = r * 255;
    if (r < 0) {
      r = 255;
    }
    g = g * 255;
    if (g < 0) {
      g = 255;
    }
    b = b * 255;
    if (b < 0) {
      b = 255;
    }
    return {
      r: r,
      g: g,
      b: b
    };
  };

  componentDidMount() {
    this.get_lights();
  }

  render() {
    return (
      <MuiThemeProvider theme={darkTheme}>
        <CssBaseline>
          <Container maxWidth="sm" style={{ marginTop: "5vh" }}>
            <h1>Lights</h1>
            {this.state.lights == null ? (
              <h1>Loading</h1>
            ) : (
              Lights(this.state.lights)
            )}
          </Container>
        </CssBaseline>
      </MuiThemeProvider>
    );
  }
}

export default App;
