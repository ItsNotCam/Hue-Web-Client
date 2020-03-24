import React from "react";
import axios from "axios";

import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Button, Grid } from "@material-ui/core";

import Lights from "./components/lights";
import { url, darkTheme } from "./config";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lights: null
    };
  }

  get_lights = () => {
    this.setState({
      lights: null
    });

    axios
      .get(`${url}/lights`)
      .then(resp => resp.data)
      .then(data => Object.keys(data).map(key => data[key]))
      .then(out => this.setState({ lights: out }));
  };

  componentDidMount() {
    this.get_lights();
  }

  render() {
    const body =
      this.state.lights == null ? (
        <h1>Loading ... </h1>
      ) : (
        Lights(this.state.lights)
      );

    return (
      <MuiThemeProvider theme={darkTheme}>
        <CssBaseline>
          <Container maxWidth="sm" style={{ marginTop: "5vh" }}>
            <Button
              onClick={this.get_lights}
              variant="contained"
              color="primary"
            >
              Refresh
            </Button>
            <Grid container justify="space-around">
              {body}
            </Grid>
          </Container>
        </CssBaseline>
      </MuiThemeProvider>
    );
  }
}

export default App;
