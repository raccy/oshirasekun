import * as R from "ramda";
import { connect } from "react-redux";
import Footer from "../components/Footer";

type BadgeLevel = "default" | "primary" | "success" | "info" | "warning" | "danger";

interface Badge {
    name: string;
    text: string;
    level: BadgeLevel;
}

const mapStateToProps = (state) => {

    const badgeList: Badge[] = R.filter<Badge>(R.identity,
        [
            R.ifElse(R.identity, R.always({
                name: "debug",
                text: "デバッグ",
                level: "danger"
            }), R.always({
                name: "nomal",
                text: "通常",
                level: "default"
            }))(state.mode.debug),
            R.ifElse(R.identity, R.always({
                name: "authenticated",
                text: "認証済み",
                level: "success"
            }), R.always({
                name: "no-authenticated",
                text: "未認証",
                level: "default"
            }))(state.auth.loggedIn),
        ]);


    // const modeList: Tag[] = [];
    // if (state.mode.debug) {
    //     modeList.push({
    //         name: "debug",
    //         text: "デバッグ",
    //         level: "danger"
    //     });
    // }
    return {
        badgeList
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
