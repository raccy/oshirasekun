// Load Bootstrap JavaScript module
import bootstrapLoad from "./bootstrap_load";
bootstrapLoad(window);

import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import StartScreen from "./components/StartScreen";

import store from "./stores";

const mainContent = document.getElementById("main");
render(
    <Provider store={store}>
        <StartScreen />
    </Provider>,
    mainContent
);
