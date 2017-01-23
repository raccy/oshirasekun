import * as R from "ramda";
import * as React from "react";
import Badge, { BadgeProps } from "./Badge";

const badgeContents = R.map<BadgeProps, JSX.Element>((props) => (
    <Badge {...props} />
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
