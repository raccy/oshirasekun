import jQuery from "jquery/dist/jquery.slim"
import Tether from "tether"

export default (globalObj) ->
  globalObj.jQuery = globalObj.$ = jQuery
  globalObj.Tether = Tether
  require("bootstrap")
