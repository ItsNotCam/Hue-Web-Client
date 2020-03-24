import React from "react";
import Light from "./light";

import Grid from "@material-ui/core/Grid";

import { xy_to_rgb } from "../util";

export default function Lights(lights) {
  if (lights == null) return "loading";

  return lights.map((light, num) => {
    const { on, bri, xy } = light.state;
    const color = xy_to_rgb(xy[0], xy[1], bri);

    return (
      <Grid item xs={6} style={{ padding: 10 }} key={num+1}>
        <Light on={on} bri={bri} name={light.name} color={color} id={num + 1} />
      </Grid>
    );
  });
}
