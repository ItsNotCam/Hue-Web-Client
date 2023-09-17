const XYToRGB = (x: number, y: number, bri: number) => {
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
};

const RGBToXY = (red: number, green: number, blue: number) => {
  if (red > 0.04045) {
    red = Math.pow((red + 0.055) / (1.0 + 0.055), 2.4);
  } else red = red / 12.92;

  if (green > 0.04045) {
    green = Math.pow((green + 0.055) / (1.0 + 0.055), 2.4);
  } else green = green / 12.92;

  if (blue > 0.04045) {
    blue = Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4);
  } else blue = blue / 12.92;

  var X: number = red * 0.664511 + green * 0.154324 + blue * 0.162028;
  var Y: number = red * 0.283881 + green * 0.668433 + blue * 0.047685;
  var Z: number = red * 0.000088 + green * 0.07231 + blue * 0.986039;
  var x: number = X / (X + Y + Z);
  var y: number = Y / (X + Y + Z);
  return [x, y];
};

export { XYToRGB as xy_to_rgb, RGBToXY as rgb_to_xy };
