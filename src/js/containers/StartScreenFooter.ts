import * as R from "ramda";
import { connect } from "react-redux";
import Footer from "../components/Footer";
import { BadgeProps } from "../components/Badge";

const mapStateToProps = (state) => {
    const badgeList: (BadgeProps)[] = R.filter<BadgeProps>(<any>R.identity,
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
            R.cond([
                [R.either(R.equals("none"), R.equals("failed")), R.always({
                    name: "unauthenticated",
                    text: "未認証",
                    level: "default"
                })],
                [R.equals("preserved"), R.always({
                    name: "repared-authenticating",
                    text: "認証前",
                    level: "default"
                })],
                [R.equals("during"), R.always({
                    name: "during-authentication",
                    text: "認証中",
                    level: "default"
                })],
                [R.equals("done"), R.always({
                    name: "authenticated",
                    text: "認証済み",
                    level: "success"
                })],
            ])(state.auth.status),
        ]);
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
