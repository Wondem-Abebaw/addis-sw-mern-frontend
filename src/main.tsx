import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// import { store } from "./store/store";
import App from "./App";
// import { GlobalStyles } from "./styles/GlobalStyles";
import { ThemeProvider } from "@emotion/react";
import store from "./store/store";
import theme from "./styles/theme";
import GlobalStyles from "./styles/globalStyles";
// import GlobalStyles from "./styles/globalStyles";
// import { theme } from "./styles/theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
