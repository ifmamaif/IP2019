import React from "react";
import ReactDOM from "react-dom";
import Login from "./components/Login"
import Record from "./components/Record"
import "./styles/index.css";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<Record />, document.getElementById("root"));
registerServiceWorker();
