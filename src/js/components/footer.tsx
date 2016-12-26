import * as React from "react";

const Footer = ({debugMode}) => {
    const modeList = [];
    if (debugMode) {
        modeList.push(
            <p key="debug_mode">デバッグモード</p>
        );
    }
    console.log(debugMode);
    return (
        <footer>
            {modeList}
        </footer>
    );
};

export default Footer;
