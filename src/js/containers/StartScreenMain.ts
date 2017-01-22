import { connect } from "react-redux";
import * as R from "ramda";
import Main from "../components/Main";
import { login } from "../actions";

const mapStateToProps = (state) => {
    const mainMode = R.cond([
        [state => !state.config.loaded, R.always("loading")],
        [state => state.auth.required && state.auth.status !== "done", R.always("auth")],
        [R.T, R.always("news")]
    ])(state);
    return {
        mainMode
    };
};
const mapDispachToProps = (dispach) => {
    return {
        handleAuth: (values) => {
            console.log(values);
            dispach(login(values));
        }
    };
};

const StartStreenMain = connect(
    mapStateToProps,
    mapDispachToProps
)(Main);

export default StartStreenMain;
