// Load Bootstrap JavaScript module
import bootstrapLoad from "./bootstrap_load";
bootstrapLoad(window);

import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import StartScreenMain from "./components/start_screen_main";

import { storeWithFilter } from "./stores";

const mainContent = document.getElementById("main");
render(
    <Provider store={storeWithFilter}>
        <StartScreenMain />
    </Provider>,
    mainContent
);
