"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const axios_1 = __importDefault(require("axios"));
const EmojiObjects_1 = __importDefault(require("@mui/icons-material/EmojiObjects"));
const material_1 = require("@mui/material");
const config_1 = require("../config");
class Light extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.toggleLights = () => __awaiter(this, void 0, void 0, function* () {
            const isOn = this.state.on;
            let res = yield (0, axios_1.default)({
                method: "PUT",
                url: `${config_1.url}/lights/${this.props.id}/state`,
                data: { on: !isOn }
            });
            if (res.status === 200) {
                console.log(res.data);
                this.setState({ on: !isOn });
            }
        });
        this.changeBrightness = (bri) => __awaiter(this, void 0, void 0, function* () {
            let res = yield (0, axios_1.default)({
                method: "PUT",
                url: `${config_1.url}/lights/${this.props.id}/state`,
                data: {
                    bri: bri
                }
            });
            if (res.status === 200) {
                this.setState({ bri: bri });
            }
        });
        this.handleBrightnessChange = (event) => __awaiter(this, void 0, void 0, function* () {
            this.changeBrightness(Number.parseInt(event.target.value));
        });
        this.state = {
            on: props.on,
            bri: props.bri,
            color: props.color,
            set: false
        };
    }
    render() {
        const { on, bri, color } = this.state;
        const { r, g, b } = color;
        const styles = {
            container: {
                margin: 0,
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: on ? `rgb(${r}, ${g}, ${b})` : "gray",
                borderRadius: "10px",
                color: on ? "black" : "white"
            },
            icon: {
                marginLeft: 30
            },
            iconContainer: {
                textAlign: "start",
                color: on ? "black" : "white"
            },
            switch: {
                textAlign: "end"
            },
            slider: {
                paddingBottom: 0
            },
            name: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                fontSize: 15
            }
        };
        /*
            <Grid item xs={7} style={styles.name}>
            <Grid item xs={3} style={styles.switch}>
        */
        return (react_1.default.createElement(material_1.Grid, { container: true, style: styles.container },
            react_1.default.createElement(material_1.Grid, { item: true, xs: 2 },
                react_1.default.createElement(EmojiObjects_1.default, { fontSize: "large" })),
            react_1.default.createElement(material_1.Grid, { item: true, xs: 7 }, this.props.name),
            react_1.default.createElement(material_1.Grid, { item: true, xs: 3 },
                react_1.default.createElement(material_1.Switch, { checked: on, onChange: this.toggleLights, color: "secondary" })),
            react_1.default.createElement(material_1.Grid, { item: true, xs: 12 }, on ? (react_1.default.createElement(material_1.Slider, { value: !on ? 0 : bri, max: 254, onChange: this.handleBrightnessChange, disabled: !on, valueLabelFormat: `${(bri / 255 * 100)}%`, valueLabelDisplay: "auto", color: "secondary", style: styles.slider })) : (""))));
    }
}
exports.default = Light;
//# sourceMappingURL=light.js.map