import R from 'ramda'
import {connect} from 'react-redux'
import Main from '../components/Main'
import {login} from '../actions'

mapStateToProps = (state) ->
  mainMode = R.cond([
    [
      (state) -> not state.config.loaded,
      R.always('loading')
    ],
    [
      (state) -> state.auth.required and state.auth.status isnt 'done',
      R.always('auth')
    ],
    [R.T, R.always('news')]
  ])(state)
  inputtable = R.cond([
    [
      (state) -> not state.config.loaded,
      R.always(false)
    ],
    [
      (state) -> state.auth.status is 'prepared' or
        state.auth.status is 'during',
      R.always(false)
    ],
    [R.T, R.always(true)]
  ])(state)
  {
    mainMode,
    inputtable
  }

mapDispachToProps = (dispach) ->
  handleAuth: (values) ->
    console.log(values)
    dispach(login(values))


StartStreenMain = connect(
  mapStateToProps,
  mapDispachToProps
)(Main)

export default StartStreenMain
