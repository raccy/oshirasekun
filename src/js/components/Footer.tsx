import * as React from "react";

const Footer = ({badgeList}) => {
    const badegContents = badgeList.map((badge) => (
        <span className={`badge badge-${badge.level}`} key={badge.name}>
            {badge.text}
        </span>
    ));
    return (
        <footer role="footer">
            <hr />
            <div className="badegs">
                {badegContents}
            </div>
        </footer>
    );
};

export default Footer;
