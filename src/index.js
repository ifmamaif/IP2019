import React from "react";
import ReactDOM from "react-dom";
import Register from "./components/Register"
import Record from "./components/Record"
import {Router} from 'react-router-dom';
import "./styles/index.css";
import history from './history';
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import Disperare from "./Disperare";
import WatsonAPI from "./components/WatsonAPI"
import ChooseYourOwnAdventure from "./components/ChooseYourOwnAdventure";

// ReactDOM.render(<Disperare/>, document.getElementById("root"));
ReactDOM.render(<Router history ={history}><ChooseYourOwnAdventure/></Router>, document.getElementById("root"));
registerServiceWorker();
