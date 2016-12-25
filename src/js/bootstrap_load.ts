import * as jQuery from "jquery";
import * as Tether from "tether";

export default function(globalObj: any) {
    globalObj.jQuery = globalObj.$ = jQuery;
    globalObj.Tether = Tether;
    require("bootstrap"); // no types
}
