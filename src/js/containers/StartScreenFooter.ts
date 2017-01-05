import { connect } from "react-redux";
import Footer from "../components/Footer";

const mapStateToProps = (state) => {
    const modeList = [];
    if (state.mode.debug) {
        modeList.push({
            name: "debug",
            text: "デバッグ",
            level: "danger"
        });
    }
    return {
        modeList
    };
};
const mapDispachToProps = (dispach) => {
    return {};
};

const StartStreenFooter = connect(
    mapStateToProps,
    mapDispachToProps
)(Footer);

export default StartStreenFooter;
