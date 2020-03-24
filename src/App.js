import React from "react";
import axios from "axios";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Button, Grid } from "@material-ui/core";

import Lights from "./components/lights";
import url from "./config";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#65C7F7",
      light: "#1cefff",
      dark: "#000"
    },
    secondary: {
      main: "#fff",
      light: "#fff",
      dark: "#000"
    }
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
    this.setState({
      lights: null
    });

    axios
      .get(`${url}/lights`)
      .then(resp => resp.data)
      .then(data => Object.keys(data).map(key => data[key]))
      .then(out => {
        console.log(out);
        this.setState({ lights: out });
      });
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
