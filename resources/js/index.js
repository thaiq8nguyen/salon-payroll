import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./AppRouter";

if (document.getElementById("app")) {
    ReactDOM.render(<AppRouter />, document.getElementById("app"));
}
