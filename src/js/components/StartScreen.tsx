import * as React from "react";
import StartScreenHeader from "../containers/StartScreenHeader";
import StartScreenMain from "../containers/StartScreenMain";
import StartScreenFooter from "../containers/StartScreenFooter";

const StartScreen = () => {
    return (
        <div>
            <StartScreenHeader />
            <StartScreenMain />
            <StartScreenFooter />
        </div>
    );
};

export default StartScreen;
