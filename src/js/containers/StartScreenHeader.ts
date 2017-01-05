import { connect } from "react-redux";
import Header from "../components/Header";

const mapStateToProps = (state) => {
    return {
        title: "認証"
    };
};
const mapDispachToProps = (dispach) => {
    return {};
};

const StartStreenHeader = connect(
    mapStateToProps,
    mapDispachToProps
)(Header);

export default StartStreenHeader;
