// Load Bootstrap JavaScript module
import bootstrapLoad from "./bootstrap_load";
bootstrapLoad(window);

import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import Main from "./components/main";

import { storeWithFilter } from "./stores";

const mainContent = document.getElementById("main");
render(
    <Provider store={storeWithFilter}>
        <Main />
    </Provider>,
    mainContent
);
