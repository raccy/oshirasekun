import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import store from './stores'
import StartScreen from './components/StartScreen'

# 今のところ何も使わない
import bsn from 'bootstrap.native/dist/bootstrap-native-v4'

mainContent = document.getElementById('main')
render(
  <Provider store={store}>
    <StartScreen />
  </Provider>
  mainContent
)
