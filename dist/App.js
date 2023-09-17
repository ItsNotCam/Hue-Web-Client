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
const Container_1 = __importDefault(require("@mui/material/Container"));
const material_1 = require("@mui/material");
const lights_1 = __importDefault(require("./components/lights"));
const config_1 = require("./config");
var qs = require('qs');
class App extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.getLights = () => __awaiter(this, void 0, void 0, function* () {
            this.setState({
                lights: new Array()
            });
            const data = yield axios_1.default.get(`${config_1.url}/lights`).then(resp => resp.data);
            let lights = new Array();
            Object.keys(data).map(key => {
                console.log(Number.parseInt(key));
                let light = Object.assign(Object.assign({}, data[key]), { id: Number.parseInt(key) });
                lights.push(light);
            });
            this.setState({ lights: this.filterLights(lights) });
        });
        this.filterLights = (lights) => {
            var filteredLights = new Array();
            for (let i = 0; i < lights.length; i++) {
                var light = lights[i];
                if (light.type === "Extended color light") {
                    light.id = i;
                    filteredLights.push(light);
                }
            }
            console.log(filteredLights);
            return filteredLights;
        };
        this.state = {
            lights: new Array()
        };
    }
    componentDidMount() {
        this.getLights();
    }
    render() {
        const body = this.state.lights == null ? (react_1.default.createElement("h1", null, "Loading...")) : ((0, lights_1.default)(this.state.lights));
        return (react_1.default.createElement(Container_1.default, { maxWidth: "sm", style: { marginTop: "5vh" } },
            react_1.default.createElement(material_1.Button, { onClick: this.getLights, variant: "contained", color: "primary" }, "Refresh"),
            react_1.default.createElement(material_1.Grid, { container: true, justifyContent: "space-around" }, body)));
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map