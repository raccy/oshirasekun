import * as React from "react";

const Footer = ({badgeList}) => {
    const badegContents = badgeList.map((badge) => (
        <span className={`badge badge-${badge.level} ml-1`} key={badge.name}>
            {badge.text}
        </span>
    ));
    return (
        <footer role="footer">
            <hr />
            <div className="badges text-right">
                {badegContents}
            </div>
        </footer>
    );
};

export default Footer;
