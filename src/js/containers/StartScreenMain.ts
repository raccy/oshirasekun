import { connect } from "react-redux";
import { cond, equals, always, T } from "ramda";
import Main from "../components/Main";

const mapStateToProps = (state) => {
    const mainMode = cond([
        [state => state.config.loaded, always("auth")],
        [T, always("loading")]
    ])(state);
    return {
        mainMode
    };
};
const mapDispachToProps = (dispach) => {
    return {
        handleAuth: (values) => {
            console.log(values);
        }
    };
};

const StartStreenMain = connect(
    mapStateToProps,
    mapDispachToProps
)(Main);

export default StartStreenMain;
