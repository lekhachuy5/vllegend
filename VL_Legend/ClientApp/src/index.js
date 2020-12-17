import React from "react";
import ReactDOM from "react-dom";


import { BrowserRouter as Router,Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./App";


ReactDOM.render(
 
    <Router >
      <App />
    </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
