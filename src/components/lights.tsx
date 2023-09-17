import React, { ReactElement } from "react";
import Light, { ILightProps } from "./light";

import Grid from "@mui/material/Grid";

import { xy_to_rgb } from "../util";
import { ILight } from "../App";

export default function Lights(lights: Array<ILight>): ReactElement | string {
  if (lights == null) return "loading";

  // <Grid item xs={6} style={{ padding: 10 }} key={num+1}>

  return (
    <>
      {lights.map((light: ILight) => {
        const { on, bri, xy } = light.state;
    
        const color = xy_to_rgb(xy[0], xy[1], bri);
    
        const lightProps: ILightProps = {
          name: light.name,
          id: light.id,
          on: on,
          bri: bri,
          color: color
        }
    
        return (
            <Grid item xs={6}>
              <Light {...lightProps} />
            </Grid>
        );
      })}
    </>
  )
}
