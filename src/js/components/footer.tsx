import * as React from "react";

const Footer = ({debugMode}) => {
    const modeList = [];
    if (debugMode) {
        modeList.push(
            <span className="tag tag-danger" key="debug_mode">デバッグ</span>
        );
    }
    return (
        <footer role="footer">
            <hr />
            <div className="tags">
                {modeList}
            </div>
        </footer>
    );
};

export default Footer;
