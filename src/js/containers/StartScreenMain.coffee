import {connect} from 'react-redux'
import Main from '../components/Main'
import {login} from '../actions'

mapStateToProps = (state) ->
  mainMode = switch
    when not state.config.loaded
      'loading'
    when state.auth.required and state.auth.status isnt 'done'
      'auth'
    else
      'news'

  inputtable = state.config.loaded and
    not ['prepared', 'during'].includes(state.auth.status)
  {
    mainMode
    inputtable
    authError: state.auth.error
  }

mapDispachToProps = (dispach) ->
  handleAuth: (values) ->
    dispach(login(values))


StartStreenMain = connect(mapStateToProps, mapDispachToProps) Main
export default StartStreenMain
