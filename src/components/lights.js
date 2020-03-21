import React from "react";
import Light from "./light";

import { Typography, Grid } from "@material-ui/core";

function xy_to_rgb(x, y, bri) {
  let z, Y, X, Z, r, g, b, maxValue;

  z = 1.0 - x - y;
  Y = bri / 255.0; // Brightness of lamp
  X = (Y / y) * x;
  Z = (Y / y) * z;
  r = X * 1.612 - Y * 0.203 - Z * 0.302;
  g = -X * 0.509 + Y * 1.412 + Z * 0.066;
  b = X * 0.026 - Y * 0.072 + Z * 0.962;
  r =
    r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, 1.0 / 2.4) - 0.055;
  g =
    g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, 1.0 / 2.4) - 0.055;
  b =
    b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, 1.0 / 2.4) - 0.055;
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
}

export default function Lights(lights) {
  if (lights == null) return "loading";

  return lights.map((light, num) => {
    const { on, bri, xy } = light.state;
    const color = xy_to_rgb(xy[0], xy[1], bri);

    return (
      <Light on={on} bri={bri} name={light.name} color={color} id={num + 1} />
    );
  });
}