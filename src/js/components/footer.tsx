import * as React from "react";

const Footer = ({modeList}) => {
    const modeContents = modeList.map((mode) => (
        <span className={`tag tag-${mode.level}`} key={mode.name}>
            {mode.text}
        </span>
    ));
    return (
        <footer role="footer">
            <hr />
            <div className="tags">
                {modeContents}
            </div>
        </footer>
    );
};

export default Footer;
