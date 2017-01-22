import * as jQuery from "jquery/dist/jquery.slim";
import * as Tether from "tether";

export default function(globalObj: any) {
    globalObj.jQuery = globalObj.$ = jQuery;
    globalObj.Tether = Tether;
    require("bootstrap"); // no types
}
