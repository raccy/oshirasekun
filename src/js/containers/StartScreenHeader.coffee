import { connect } from "react-redux"
import Header from "../components/Header"

mapStateToProps = (state) ->
  title: "お知らせ君"

mapDispachToProps = (dispach) -> {}


StartStreenHeader = connect(
  mapStateToProps,
  mapDispachToProps
)(Header)

export default StartStreenHeader
