import * as jQuery from "jquery";
const $ = jQuery;
(<any>window).jQuery = (<any>window).$ = jQuery;
import * as Tether from "tether";
(<any>window).Tether = Tether;
require("bootstrap");

import * as React from "react";
import * as ReactDOM from "react-dom";
import Main from "./lib/component/main";

const mainContent = document.getElementById("main");
ReactDOM.render(React.createElement(Main, null), mainContent);
