import { connect } from "react-redux";
import Footer from "../components/Footer";

const mapStateToProps = (state) => {
    return {
        debugMode: state.mode.debug
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
