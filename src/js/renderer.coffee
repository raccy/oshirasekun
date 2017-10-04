import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import store from "./stores"
import StartScreen from "./components/StartScreen"

# Load Bootstrap JavaScript module
import bootstrapLoad from "./libs/bootstrap_load"
bootstrapLoad(window)

mainContent = document.getElementById("main")
render(
  <Provider store={store}>
    <StartScreen />
  </Provider>,
  mainContent
)
