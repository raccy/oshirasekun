import {connect} from 'react-redux'
import Footer from '../components/Footer'

mapStateToProps = (state) ->
  modeBadge = if state.mode.debug
    name: 'debug'
    text: 'デバッグ'
    level: 'danger'
  else
    name: 'nomal'
    text: '通常'
    level: 'primary'

  authBadge = switch state.auth.status
    when 'none', 'failed'
      name: 'unauthenticated'
      text: '未認証'
      level: 'secondary'
    when 'preserved'
      name: 'repared-authenticating'
      text: '認証前'
      level: 'secondary'
    when 'during'
      name: 'during-authentication'
      text: '認証中'
      level: 'info'
    when 'done'
      name: 'authenticated'
      text: '認証済み'
      level: 'success'
  closable = not state.auth.required or state.auth.status is 'done'
  {
    badgeList: [modeBadge, authBadge].filter((e) -> e?)
    closable
  }

mapDispachToProps = (dispach) -> {}

StartStreenFooter = connect(mapStateToProps, mapDispachToProps) Footer
export default StartStreenFooter
