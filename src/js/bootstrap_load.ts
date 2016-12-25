import * as jQuery from "jquery";
import * as Tether from "tether";

export default function(globalObj: Object) {
    (<any>globalObj).jQuery = (<any>globalObj).$ = jQuery;
    (<any>globalObj).Tether = Tether;
    require("bootstrap"); // no types
}
