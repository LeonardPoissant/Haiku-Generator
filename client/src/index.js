import React from "react";
import ReactDOM from "react-dom";

import App from "./Components/App";

import HaikuDataBaseProvider from "./HaikuContext/HaikuDataBaseContext";

ReactDOM.render(
  <React.StrictMode>
    <HaikuDataBaseProvider>
      <App />
    </HaikuDataBaseProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
