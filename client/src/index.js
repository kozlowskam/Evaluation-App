import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import store from "./store";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,

  document.getElementById("root")
);
registerServiceWorker();

const theme = createMuiTheme({
  // typography: {
  //   fontFamily: 'Luckiest Guy'
  // },
  palette: {
    type: "dark",
    primary: {
      light: "#7986cb",
      main: "#222",
      dark: "#222",
      contrastText: "#fff"
    }
    // text: {
    //   secondary: '#1dfc00'
    // }
  },
  overrides: {
    MuiTypography: {
      //fontFamily: 'Luckiest Guy',
      colorPrimary: { color: "green" },
      colorTextSecondary: { color: "red" },
      colorSecondary: { color: "yellow" }
    },
    MuiButton: {
      root: {
        background: "#33ff00"
      }
    },
    MuiIcon: {
      root: {
        color: "#1dfc00"
      }
    }
  }
});
