import * as React from "react";
import * as ReactDOM from "react-dom";

class MainApp extends React.Component<{}, {}> {
    render() {
        return <p>ほげ</p>;
    }
}

const mainContent = document.getElementById("main");
ReactDOM.render(<MainApp />, mainContent);
