import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./views/Login";
import Technicians from "./views/Technicians";
import Register from "./views/Register";

const AppRouter = () => (
    <div className="app-router">
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/technicians" component={Technicians} />
                <Route path="/register" component={Register} />
            </Switch>
        </Router>
    </div>
);

export default AppRouter;
