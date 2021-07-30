import React from "react";
import ReactDOM from "react-dom"
//import App from "./app";

const App = () => {
    console.log("app is here")
    return(
        <div>
            <h1>This is a payroll app!</h1>
        </div>
    )
}


if(document.getElementById("app")){
    
    ReactDOM.render(<App/>, document.getElementById("app"))
}
