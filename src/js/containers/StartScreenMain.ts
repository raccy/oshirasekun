import { connect } from "react-redux";
import Main from "../components/Main";

const mapStateToProps = (state) => {
    let mainMode = null;
    if (!state.config.loaded) {
        mainMode = "loading";
    } else {
        mainMode = "auth"
    }
    return {
        mainMode
    };
};
const mapDispachToProps = (dispach) => {
    return {};
};

const StartStreenMain = connect(
    mapStateToProps,
    mapDispachToProps
)(Main);

export default StartStreenMain;
