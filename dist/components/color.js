"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_color_1 = require("react-color");
class Color extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            background: '#fff',
        };
        this.handleChangeComplete = (color) => {
            this.setState({ background: color.hex });
        };
    }
    render() {
        return (react_1.default.createElement(react_color_1.SketchPicker, { color: this.state.background, onChangeComplete: this.handleChangeComplete }));
    }
}
exports.default = Color;
//# sourceMappingURL=color.js.map