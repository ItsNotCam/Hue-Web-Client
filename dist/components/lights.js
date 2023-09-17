"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const light_1 = __importDefault(require("./light"));
const Grid_1 = __importDefault(require("@mui/material/Grid"));
const util_1 = require("../util");
function Lights(lights) {
    if (lights == null)
        return "loading";
    // <Grid item xs={6} style={{ padding: 10 }} key={num+1}>
    return (react_1.default.createElement(react_1.default.Fragment, null, lights.map((light) => {
        const { on, bri, xy } = light.state;
        const color = (0, util_1.xy_to_rgb)(xy[0], xy[1], bri);
        const lightProps = {
            name: light.name,
            id: light.id,
            on: on,
            bri: bri,
            color: color
        };
        return (react_1.default.createElement(Grid_1.default, { item: true, xs: 6 },
            react_1.default.createElement(light_1.default, Object.assign({}, lightProps))));
    })));
}
exports.default = Lights;
//# sourceMappingURL=lights.js.map