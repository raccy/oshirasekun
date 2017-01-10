import { connect } from "react-redux";
import { cond, equals, always, T } from "ramda";
import Main from "../components/Main";
import { login } from "../actions";

const mapStateToProps = (state) => {
    const mainMode = cond([
        [state => !state.config.loaded, always("loading")],
        [state => state.auth.required && !state.auth.authenticated, always("auth")],
        [T, always("news")]
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
