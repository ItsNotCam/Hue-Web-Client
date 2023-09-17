import React from "react";
import axios from "axios";

import Container from "@mui/material/Container";
import { Button, Grid } from "@mui/material";

import Lights from "./components/lights";
import { url } from "./config";
import { InsertEmoticon } from "@mui/icons-material";

var qs = require('qs');

export interface IAppState {
  lights: Array<ILight>;
}

export interface ILight {
  state: {
    bri: number;
    xy: Array<number>;
    on: boolean;
  },
  name: string;
  type: string;
  id: number;
}

export default class App extends React.Component<{}, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      lights: new Array<ILight>()
    };
  }

  getLights = async() => {
    const data: any = await axios.get(`${url}/lights`).then(resp => resp.data);
    let lights: Array<ILight> = new Array<ILight>();
    Object.keys(data).map(key => {
      let light: ILight = {
        ...data[key],
        id: Number.parseInt(key)
      };
      lights.push(light);
    })

    this.setState({ lights: this.filterLights(lights) });
  };

  componentDidMount() {
    this.getLights();
  }

  filterLights = (lights: Array<ILight>): Array<ILight> => {
    var filteredLights: Array<ILight> = new Array<ILight>();

    for(let i=0; i < lights.length; i++) {
      var light: ILight = lights[i];
      if(light.type === "Extended color light") {
        filteredLights.push(light);
      }
    }

    console.log(filteredLights);

    return filteredLights;
  }

  render() {
    const body =
      this.state.lights == null ? (
        <h1>Loading...</h1>
      ) : (
        Lights(this.state.lights)
      );

    return (
        <Container maxWidth="sm" style={{ marginTop: "5vh" }}>
          <Button
            onClick={this.getLights}
            variant="contained"
            color="primary"
          >
            Refresh
          </Button>
          <Grid container justifyContent="space-around">
            {body}
          </Grid>
        </Container>
    );
  }
}