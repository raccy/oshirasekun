import { connect } from "react-redux";
import Footer from "../components/footer";

const mapStateToProps = (state) => {
    return {
        debugMode: state.mode.debug
    };
};
const mapDispachToProps = (dispach) => {
    return {};
};
const InformationFooter = connect(
    mapStateToProps,
    mapDispachToProps
)(Footer);

export default InformationFooter;
