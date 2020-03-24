import { createMuiTheme } from "@material-ui/core/styles";

const user_id = "eXbpUKQhYxGRtQRgDKAVlVUzyv0BO8WS5erAYWnu";
const url = `http://192.168.1.12/api/${user_id}`;

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

export { url, darkTheme };
