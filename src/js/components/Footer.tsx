import * as R from "ramda";
import * as React from "react";
import { Badge } from "../containers/StartScreenFooter";

const badgeContents = R.map<Badge, JSX.Element>((badge) => (
    <span className={`badge badge-${badge.level} ml-1`} key={badge.name}>
        {badge.text}
    </span>
));


const Footer = ({badgeList}) => (
    <footer role="footer">
        <hr />
        <div className="badges text-right">
            {badgeContents(badgeList)}
        </div>
    </footer>
);

export default Footer;
